import React, { useEffect } from 'react';
import classes from './FavoriteProductsPageMainPart.module.css';
import FavoriteProductsList from './FavoriteProductsList/FavoriteProductsList';
import { getFavoriteProductsThunk } from '../../../store/favoriteSlice';
import { useAppDispatch } from '../../../hooks/hooks';

const FavoriteProductsPageMainPart: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      dispatch(getFavoriteProductsThunk(token));
    }
  }, [dispatch]);
  return (
    <div className={classes.container}>
      <div className={classes.title}>Список избранных товаров</div>
      <FavoriteProductsList />
    </div>
  );
};

export default FavoriteProductsPageMainPart;
