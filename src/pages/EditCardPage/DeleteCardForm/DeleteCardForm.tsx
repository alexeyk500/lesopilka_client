import React from 'react';
import classes from './DeleteCardForm.module.css';
import { ProductType } from '../../../types/types';
import ProductCardLayout from '../../../components/ProductCard/ProductCardLayout';

type PropsType = {
  product: ProductType;
};

const DeleteCardForm: React.FC<PropsType> = ({ product }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Удалить карточку товара</div>
      <div className={classes.cardContainer}>
        <ProductCardLayout product={product} isManufacturerProductCard />
      </div>
    </div>
  );
};

export default DeleteCardForm;
