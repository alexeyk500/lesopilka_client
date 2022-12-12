import React from 'react';
import classes from './PriceInfo.module.css';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorPriceProducts } from '../../../../../store/priceSlice';

const PriceInfo: React.FC = () => {
  const products = useAppSelector(selectorPriceProducts);

  const productsCount = products.length;
  const publishedProductsCount = products.filter((product) => product.publicationDate).length;

  return (
    <div className={classes.container}>
      <div className={classes.rowInfo}>
        <span className={classes.rowInfoTitle}>Опубликовано</span>- &nbsp;{publishedProductsCount}
      </div>
      <div className={classes.rowInfo}>
        <span className={classes.rowInfoTitle}>Черновики</span>- &nbsp;{productsCount - publishedProductsCount}
      </div>
      <div className={classes.rowInfo}>
        <span className={classes.rowInfoTitle}>Всего</span>- &nbsp;{productsCount}
      </div>
    </div>
  );
};

export default PriceInfo;
