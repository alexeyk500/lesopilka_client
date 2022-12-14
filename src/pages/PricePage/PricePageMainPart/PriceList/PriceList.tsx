import React, { ReactNode, useEffect, useRef, useState } from 'react';
import classes from './PriceList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import { PageTypeEnum, PriceSelectedTypeEnum, ProductType, QueryEnum } from '../../../../types/types';
import {
  getPriceProductsThunk,
  selectorPriceEditProductId,
  selectorPriceProducts,
  selectorSelectedPriceType,
  setPriceEditProductId,
} from '../../../../store/priceSlice';
import PriceListProductItem from './PriceListProductItem/PriceListProductItem';
import { selectorSubCategories } from '../../../../store/catalogSlice';
import PriceListGroupTitle from './PriceListGroupTitle/PriceListGroupTitle';

const PriceList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const products = useAppSelector(selectorPriceProducts);
  const subCategories = useAppSelector(selectorSubCategories);
  const selectedPriceType = useAppSelector(selectorSelectedPriceType);
  const priceEditProductId = useAppSelector(selectorPriceEditProductId);

  const refs = useRef<HTMLDivElement[]>([]);

  const [price, setPrice] = useState<ReactNode[]>([]);
  const [highlightedId, setHighlightedId] = useState<number | undefined>(32);

  useEffect(() => {
    if (user?.manufacturer?.id) {
      const searchParams = new URLSearchParams();
      searchParams.append(QueryEnum.ManufacturerId, user.manufacturer.id.toString());
      searchParams.append(QueryEnum.PageType, PageTypeEnum.pricePage);
      dispatch(getPriceProductsThunk(searchParams));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const splitBySubCategory = (products: ProductType[] | undefined) => {
      if (products && products.length > 0) {
        const separatedProducts: ProductType[][] = [];
        subCategories.forEach((subCategory) => {
          const subCategoryProducts = products.filter((product) => product.subCategory?.id === subCategory.id);
          if (subCategoryProducts.length > 0) {
            separatedProducts.push(subCategoryProducts);
          }
        });
        const withoutSubCategoryProducts = products.filter((product) => product.subCategory === undefined);
        if (withoutSubCategoryProducts.length > 0) {
          separatedProducts.push(withoutSubCategoryProducts);
        }
        return separatedProducts;
      }
    };
    const splitByIsDried = (productsGroup: ProductType[][] | undefined) => {
      if (productsGroup && productsGroup.length > 0) {
        const separatedProducts: ProductType[][] = [];
        productsGroup.forEach((productGroup) => {
          const isDriedProducts = productGroup.filter((product) => product.isDried === true);
          const notIsDriedProducts = productGroup.filter((product) => product.isDried === false);
          if (notIsDriedProducts.length > 0) {
            separatedProducts.push(notIsDriedProducts);
          }
          if (isDriedProducts.length > 0) {
            separatedProducts.push(isDriedProducts);
          }
        });
        return separatedProducts;
      }
    };
    const splitByIsSeptic = (productsGroup: ProductType[][] | undefined) => {
      if (productsGroup && productsGroup.length > 0) {
        const separatedProducts: ProductType[][] = [];
        productsGroup.forEach((productGroup) => {
          const isSepticProducts = productGroup.filter((product) => product.isSeptic === true);
          const notIsSepticProducts = productGroup.filter((product) => product.isSeptic === false);
          if (notIsSepticProducts.length > 0) {
            separatedProducts.push(notIsSepticProducts);
          }
          if (isSepticProducts.length > 0) {
            separatedProducts.push(isSepticProducts);
          }
        });
        return separatedProducts;
      }
    };
    const sortBySize = (productsGroup: ProductType[][] | undefined) => {
      if (productsGroup && productsGroup.length > 0) {
        const separatedProducts: ProductType[][] = [];
        productsGroup.forEach((productGroup) => {
          if (productGroup.length > 0) {
            const sortedByLength = productGroup.sort((a, b) => {
              return Number(a.length) - Number(b.length);
            });
            if (productGroup[0].caliber) {
              const sortedByCaliber = sortedByLength.sort((a, b) => {
                return Number(a.caliber) - Number(b.caliber);
              });
              separatedProducts.push(sortedByCaliber);
            } else {
              const sortedByWidth = sortedByLength.sort((a, b) => {
                return Number(a.width) - Number(b.width);
              });
              const sortedByHeight = sortedByWidth.sort((a, b) => {
                return Number(a.height) - Number(b.height);
              });
              separatedProducts.push(sortedByHeight);
            }
          }
        });
        return separatedProducts;
      }
    };
    const sortBySortId = (productsGroup: ProductType[][] | undefined) => {
      if (productsGroup && productsGroup.length > 0) {
        const separatedProducts: ProductType[][] = [];
        productsGroup.forEach((productGroup) => {
          if (productGroup.length > 0) {
            const sortedBySortId = productGroup.sort((a, b) => {
              return Number(a.sort?.id) - Number(b.sort?.id);
            });
            separatedProducts.push(sortedBySortId);
          }
        });
        return separatedProducts;
      }
    };
    const sortByMaterialId = (productsGroup: ProductType[][] | undefined) => {
      if (productsGroup && productsGroup.length > 0) {
        const separatedProducts: ProductType[][] = [];
        productsGroup.forEach((productGroup) => {
          if (productGroup.length > 0) {
            const sortedBySortId = productGroup.sort((a, b) => {
              return Number(a.material?.id) - Number(b.material?.id);
            });
            separatedProducts.push(sortedBySortId);
          }
        });
        return separatedProducts;
      }
    };

    const onClickProduct = (id: number) => {
      setHighlightedId(id);
    };

    if (products.length > 0) {
      const productsForView =
        selectedPriceType === PriceSelectedTypeEnum.all
          ? products
          : selectedPriceType === PriceSelectedTypeEnum.published
          ? products.filter((product) => product.publicationDate)
          : products.filter((product) => product.publicationDate === undefined);

      const makePriceList = (products: ProductType[]): ReactNode[] => {
        const priceNodes: ReactNode[] = [];

        let separatedProducts = splitBySubCategory(products);
        separatedProducts = splitByIsDried(separatedProducts);
        separatedProducts = splitByIsSeptic(separatedProducts);
        separatedProducts = sortBySortId(separatedProducts);
        separatedProducts = sortByMaterialId(separatedProducts);
        separatedProducts = sortBySize(separatedProducts);

        refs.current = [];
        separatedProducts?.forEach((productGroup, ind) => {
          const subCategory = productGroup[0].subCategory;
          const isDried = productGroup[0].isDried || false;
          const isSeptic = productGroup[0].isSeptic || false;
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
      <div className={classes.titleContainer}>
        <div className={classes.pageTitle}>
          {selectedPriceType === PriceSelectedTypeEnum.published
            ? `Прайс лист на пиломатериалы`
            : selectedPriceType === PriceSelectedTypeEnum.draft
            ? 'Черновики'
            : 'Полный список товаров'}
        </div>
        <div className={classes.twoColumnContainer}>
          <div className={classes.manufacturerInfo}>
            <div className={classes.rowTitle}>{user?.manufacturer?.title}</div>
            <div className={classes.rowTitle}>
              <span className={classes.bold}>адрес:&nbsp;</span>
              {user?.manufacturer?.address?.region.title}, {user?.manufacturer?.address?.location.title},{' '}
              {user?.manufacturer?.address?.street}, {user?.manufacturer?.address?.building}
              {user?.manufacturer?.address?.office && <>', '{user?.manufacturer?.address?.office}</>}
            </div>
            <div className={classes.rowTitle}>
              <span className={classes.bold}>эл.почта:&nbsp;</span>
              {user?.email}
            </div>
            <div className={classes.rowTitle}>
              <span className={classes.bold}>тел.&nbsp;</span>
              {user?.manufacturer?.phone}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.listScrollContainer}>{price}</div>
    </div>
  );
};

export default PriceList;
