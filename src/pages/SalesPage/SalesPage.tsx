import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { catalogIsLoading, getCategoriesThunk } from '../../store/catalogSlice';
import classes from '../MainPage/MainPage.module.css';
import Preloader from '../../components/Preloader/Preloader';
import Catalog from '../../components/Catalog/Catalog';

const SalesPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(catalogIsLoading);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  return <div className={classes.container}>{isLoading ? <Preloader /> : <Catalog />}</div>;
};

export default SalesPage;
