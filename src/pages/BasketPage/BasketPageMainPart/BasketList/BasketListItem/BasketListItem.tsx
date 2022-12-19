import React from 'react';
import classes from './BasketListItem.module.css';
import {ProductType} from "../../../../../types/types";

type PropsType = {
  num: number
  product: ProductType,
}

const BasketListItem: React.FC <PropsType> = ({num, product}) => {
  return (
    <div className={classes.container}>
      <div className={classes.numTitle}>
        {num}
      </div>
      <div className={classes.imageContainer}>
        <img src={product.images?.[0] || ''} className={classes.img} alt="product"/>
      </div>
    </div>
  );
};

export default BasketListItem;
