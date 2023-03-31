import React from 'react';
import classes from './FavoriteProductsPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import FavoriteProductsPageControl from './FavoriteProductsPageControl/FavoriteProductsPageControl';
import MainColumn from '../../components/MainColumn/MainColumn';
import FavoriteProductsPageMainPart from './FavoriteProductsPageMainPart/FavoriteProductsPageMainPart';

const FavoriteProductsPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Избранные Товары`}>
        <FavoriteProductsPageControl />
      </LeftColumn>
      <MainColumn noScroll>
        <FavoriteProductsPageMainPart />
      </MainColumn>
    </div>
  );
};

export default FavoriteProductsPage;
