import React from 'react';
import classes from './BasketPageMainPart.module.css';
import BasketList from './BasketList/BasketList';
import { ProductType } from '../../../types/types';

type PropsType = {
  productsByManufacturer: ProductType[][];
  manufacturersRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
};

const BasketPageMainPart: React.FC<PropsType> = ({ productsByManufacturer, manufacturersRef }) => {
  return (
    <div className={classes.container}>
      <BasketList productsByManufacturer={productsByManufacturer} manufacturersRef={manufacturersRef} />
    </div>
  );
};

export default BasketPageMainPart;
