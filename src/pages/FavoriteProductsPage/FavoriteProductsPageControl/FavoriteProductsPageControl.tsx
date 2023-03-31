import React from 'react';
import classes from './FavoriteProductsPageControl.module.css';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import FavoriteProductsCategorySelector from './FavoriteProductsCategorySelector/FavoriteProductsCategorySelector';

const FavoriteProductsPageControl: React.FC = () => {
  return (
    <div className={classes.container}>
      <FavoriteProductsCategorySelector />
      <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
    </div>
  );
};

export default FavoriteProductsPageControl;
