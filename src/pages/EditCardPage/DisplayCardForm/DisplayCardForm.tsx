import React from 'react';
import classes from './DisplayCardForm.module.css';
import { ProductType } from '../../../types/types';
import ProductCardLayout from '../../../components/ProductCard/ProductCardLayout';

type PropsType = {
  title: string;
  product: ProductType;
  isPreview?: boolean;
};

const DisplayCardForm: React.FC<PropsType> = ({ title, product, isPreview }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.cardContainer}>
        <ProductCardLayout product={product} isPreview={isPreview} isManufacturerProductCard />
      </div>
    </div>
  );
};

export default DisplayCardForm;
