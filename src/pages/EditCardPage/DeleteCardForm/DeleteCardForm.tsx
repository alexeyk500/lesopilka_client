import React from 'react';
import classes from './DeleteCardForm.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { ProductType } from '../../../types/types';

type PropsType = {
  product: ProductType;
};

const DeleteCardForm: React.FC<PropsType> = ({ product }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Удалить карточку товара</div>
      <div className={classes.cardContainer}>
        <ProductCard product={product} isManufacturerProductCard />
      </div>
    </div>
  );
};

export default DeleteCardForm;
