import React, { ReactNode, useEffect, useState } from 'react';
import classes from './PriceList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import { PageTypeEnum, ProductType, QueryEnum } from '../../../../types/types';
import { getPriceProductsThunk, selectorPriceProducts } from '../../../../store/priceSlice';
import PriceListProductItem from './PriceListProductItem/PriceListProductItem';
import { selectorSubCategories } from '../../../../store/catalogSlice';
import PriceListGroupTitle from './PriceListGroupTitle/PriceListGroupTitle';

const PriceList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const products = useAppSelector(selectorPriceProducts);
  const subCategories = useAppSelector(selectorSubCategories);

  const [price, setPrice] = useState<ReactNode[]>([]);

  useEffect(() => {
    if (user?.manufacturer?.id) {
      const searchParams = new URLSearchParams();
      searchParams.append(QueryEnum.ManufacturerId, user.manufacturer.id.toString());
      searchParams.append(QueryEnum.PageType, PageTypeEnum.pricePage);
      dispatch(getPriceProductsThunk(searchParams));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (products.length > 0) {
      const makePrice = (products: ProductType[]): ReactNode[] => {
        const priceNodes: ReactNode[] = [];
        if (products.length > 0) {
          subCategories.forEach((subCategory) => {
            const subCategoryProducts = products.filter((product) => product.subCategory?.id === subCategory.id);
            if (subCategoryProducts.length > 0) {
              priceNodes.push(<PriceListGroupTitle key={`${subCategory.id}sc`} subCategory={subCategory} />);
              subCategoryProducts.forEach((product) => {
                priceNodes.push(<PriceListProductItem key={product.id} product={product} />);
              });
            }
          });
        }
        return priceNodes;
      };

      setPrice(makePrice(products));
    }
  }, [products, subCategories]);

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <div className={classes.pageTitle}>Прайс лист на пиломатериалы</div>
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
          <div className={classes.productsInfo}>
            <div className={classes.rowInfo}>
              <span className={classes.rowInfoTitle}>Всего позиций</span>- &nbsp;{'120'}
            </div>
            <div className={classes.rowInfo}>
              <span className={classes.rowInfoTitle}>Опубликовано</span>- &nbsp;{'85'}
            </div>
            <div className={classes.rowInfo}>
              <span className={classes.rowInfoTitle}>Скрыто</span>- &nbsp;{'25'}
            </div>
          </div>
        </div>
      </div>

      <div className={classes.listContainer}>{price}</div>
    </div>
  );
};

export default PriceList;
