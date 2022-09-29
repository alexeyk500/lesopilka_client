import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { catalogIsLoading, getCategoriesThunk } from '../../store/catalogSlice';
import classes from './SalesPage.module.css';
import Preloader from '../../components/Preloader/Preloader';
import Catalog from '../../components/Catalog/Catalog';
import SalesMainPart from './SalesMainPart/SalesMainPart';
import LeftColumn from '../../components/LeftColumn/LeftColumn';

const SalesPage = () => {
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
        <>
          <LeftColumn>
            <Catalog />
          </LeftColumn>
          <SalesMainPart />
        </>
      )}
    </div>
  );
};

export default SalesPage;
