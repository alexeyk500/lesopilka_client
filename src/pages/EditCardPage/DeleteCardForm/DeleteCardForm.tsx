import React from 'react';
import classes from './DeleteCardForm.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { ProductCardDataType } from '../../../types/types';

type PropsType = {
  productCardData: ProductCardDataType;
};

const DeleteCardForm: React.FC<PropsType> = ({ productCardData }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Удалить карточку товара</div>
      <div className={classes.cardContainer}>
        <ProductCard productCardData={productCardData} isManufacturerProductCard />
      </div>
    </div>
  );
};

export default DeleteCardForm;
