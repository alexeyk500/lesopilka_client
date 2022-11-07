import React, { useEffect } from 'react';
import classes from './MainPage.module.css';
import Catalog from '../../components/Catalog/Catalog';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Preloader from '../../components/Preloader/Preloader';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import { getProductsThunk, selectorFilters, selectorProductsLoading } from '../../store/productSlice';
import { getValueFromFilter } from '../../utils/functions';
import FilterSelectors from './FilterSelectors/FilterSelectors';
import MainPageMainPart from './MainPageMainPart/MainPageMainPart';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectorProductsLoading);
  const filters = useAppSelector(selectorFilters);
  const categoryId = getValueFromFilter(filters, 'categoryId');

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <LeftColumn>{categoryId ? <FilterSelectors /> : <Catalog />}</LeftColumn>
          <MainPageMainPart />
        </>
      )}
    </div>
  );
};

export default MainPage;
