import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import classes from './SalesPage.module.css';
import Preloader from '../../components/Preloader/Preloader';
import Catalog from '../../components/Catalog/Catalog';
import SalesMainPart from './SalesMainPart/SalesMainPart';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import { getProductsThunk, selectorProductsLoading } from '../../store/productSlice';
import { useSearchParams } from 'react-router-dom';

const SalesPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectorProductsLoading);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams && dispatch(getProductsThunk(searchParams));
  }, [dispatch, searchParams]);

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
