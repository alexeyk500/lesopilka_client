import React, { ReactNode, useEffect, useRef, useState } from 'react';
import classes from './PriceList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import { PageTypeEnum, PriceSelectedTypeEnum, ProductType, QueryEnum } from '../../../../types/types';
import {
  getPriceProductsThunk,
  selectorPriceDownloading,
  selectorPriceEditProductId,
  selectorPriceProducts,
  selectorSelectedPriceType,
  setPriceEditProductId,
} from '../../../../store/priceSlice';
import PriceListProductItem from './PriceListProductItem/PriceListProductItem';
import { selectorSubCategories } from '../../../../store/catalogSlice';
import PriceListGroupTitle from './PriceListGroupTitle/PriceListGroupTitle';
import Preloader from '../../../../components/Preloader/Preloader';
import logo from '../../../../img/logo.png';
import {
  sortByMaterialId,
  sortBySize,
  sortBySortId,
  splitByIsDried,
  splitByIsSeptic,
  splitBySubCategory,
} from '../../../../utils/productFunctions';
import { checkIsManufacturerPage } from '../../../../utils/functions';
import { useLocation, useParams } from 'react-router-dom';

const PriceList = () => {
  const { mid } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector(selectorUser);
  const products = useAppSelector(selectorPriceProducts);
  const subCategories = useAppSelector(selectorSubCategories);
  const selectedPriceType = useAppSelector(selectorSelectedPriceType);
  const priceEditProductId = useAppSelector(selectorPriceEditProductId);
  const priceDownloading = useAppSelector(selectorPriceDownloading);
  const isManufacturerPage = checkIsManufacturerPage(location);

  const refs = useRef<HTMLDivElement[]>([]);

  const [price, setPrice] = useState<ReactNode[]>([]);
  const [highlightedId, setHighlightedId] = useState<number | undefined>(32);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append(QueryEnum.PageType, PageTypeEnum.pricePage);
    if (isManufacturerPage) {
      if (user?.manufacturer?.id) {
        searchParams.append(QueryEnum.ManufacturerId, user.manufacturer.id.toString());
      }
    } else {
      if (mid) {
        searchParams.append(QueryEnum.ManufacturerId, mid);
      }
    }
    if (searchParams.get(QueryEnum.PageType) && searchParams.get(QueryEnum.ManufacturerId)) {
      dispatch(getPriceProductsThunk(searchParams));
    }
  }, [dispatch, user, isManufacturerPage, mid]);

  const onClickProduct = (id: number) => {
    setHighlightedId(id);
  };

  useEffect(() => {
    if (products.length > 0) {
      const productsForView =
        selectedPriceType === PriceSelectedTypeEnum.all
          ? products
          : selectedPriceType === PriceSelectedTypeEnum.published
          ? products.filter((product) => product.publicationDate)
          : products.filter((product) => product.publicationDate === undefined);

      const makePriceList = (products: ProductType[]): ReactNode[] => {
        const priceNodes: ReactNode[] = [];

        let separatedProducts = splitBySubCategory(products, subCategories);
        separatedProducts = splitByIsDried(separatedProducts);
        separatedProducts = splitByIsSeptic(separatedProducts);
        separatedProducts = sortBySortId(separatedProducts);
        separatedProducts = sortByMaterialId(separatedProducts);
        separatedProducts = sortBySize(separatedProducts);

        refs.current = [];
        separatedProducts?.forEach((productGroup, ind) => {
          const subCategory = productGroup[0]?.subCategory;
          const isDried = productGroup[0]?.isDried || false;
          const isSeptic = productGroup[0]?.isSeptic || false;
          priceNodes.push(
            <PriceListGroupTitle key={`${ind}sc`} subCategory={subCategory} isDried={isDried} isSeptic={isSeptic} />
          );
          productGroup.forEach((product) => {
            priceNodes.push(
              <div
                key={`${product.id}pr`}
                ref={(ref) => {
                  ref && refs.current?.push(ref);
                }}
                id={`${product.id}pr`}
                onClick={() => {
                  onClickProduct(product.id);
                }}
              >
                <PriceListProductItem product={product} highlighted={product.id === highlightedId} />
              </div>
            );
          });
        });
        return priceNodes;
      };
      setPrice(makePriceList(productsForView));
    }
  }, [dispatch, products, subCategories, selectedPriceType, priceEditProductId, highlightedId]);

  useEffect(() => {
    if (price.length > 0 && priceEditProductId) {
      const scrollDiv = refs.current.find((div) => div.id === `${priceEditProductId}pr`);
      if (scrollDiv) {
        scrollDiv.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        dispatch(setPriceEditProductId(undefined));
        setHighlightedId(priceEditProductId);
      }
    }
  }, [dispatch, price, priceEditProductId]);

  return (
    <div className={classes.container}>
      <div className={classes.priceContentContainer}>
        <div className={classes.titleContainer}>
          <div className={classes.dateRow}>15 декабря 2022 года</div>
          <div className={classes.pageTitle}>
            {selectedPriceType === PriceSelectedTypeEnum.published
              ? `Прайс лист на пиломатериалы`
              : selectedPriceType === PriceSelectedTypeEnum.draft
              ? 'Черновики'
              : 'Полный список товаров'}
          </div>
        </div>
        <div className={classes.twoColumnContainer}>
          <div className={classes.manufacturerInfo}>
            <div className={classes.rowTitle}>{user?.manufacturer?.title}</div>
            <div className={classes.rowTitle}>
              {user?.manufacturer?.address?.region.title}, {user?.manufacturer?.address?.location.title},{' '}
              {user?.manufacturer?.address?.street}, {`д.${user?.manufacturer?.address?.building}`}
              {user?.manufacturer?.address?.office && `, оф.${user?.manufacturer?.address?.office}`}
            </div>
            <div className={classes.rowTitle}>{user?.email}</div>
            <div className={classes.rowTitle}>{user?.manufacturer?.phone}</div>
          </div>
        </div>
        <div className={classes.logoContainer}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      {priceDownloading ? (
        <div className={classes.preloaderContainer}>
          <Preloader />{' '}
        </div>
      ) : (
        <div className={classes.listScrollContainer}>{price}</div>
      )}
    </div>
  );
};

export default PriceList;
