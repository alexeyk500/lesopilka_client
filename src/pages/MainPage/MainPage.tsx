import React, { useEffect } from 'react';
import classes from './MainPage.module.css';
import Catalog from '../../components/Catalog/Catalog';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { catalogIsLoading, getCategoriesThunk } from '../../store/catalogSlice';
import Preloader from '../../components/Preloader/Preloader';
import LeftColumn from '../../components/LeftColumn/LeftColumn';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(catalogIsLoading);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      {isLoading ? (
        <Preloader />
      ) : (
        <LeftColumn>
          <Catalog />
        </LeftColumn>
      )}
    </div>
  );
};

export default MainPage;
