import React from 'react';
import classes from './MainPageMainPart.module.css';
import FiltersRow from '../FiltersRow/FiltersRow';
import ProductList from '../ProductList/ProductList';
import { useSearchParams } from 'react-router-dom';
import { isFiltersSearchParams } from '../../../utils/functions';

const MainPageMainPart = () => {
  const [searchParams] = useSearchParams();
  const isSearchParams = isFiltersSearchParams(searchParams);

  return (
    <div className={classes.container}>
      <div className={classes.filtersRowContainer}>{isSearchParams && <FiltersRow />}</div>
      <div className={classes.filtersProductListContainer}>
        <ProductList />
      </div>
    </div>
  );
};

export default MainPageMainPart;
