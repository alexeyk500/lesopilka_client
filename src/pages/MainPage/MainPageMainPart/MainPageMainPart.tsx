import React from 'react';
import classes from './MainPageMainPart.module.css';
import FiltersRow from '../FiltersRow/FiltersRow';
import ProductList from '../ProductList/ProductList';
import { useSearchParams } from 'react-router-dom';
import { isSearchParamsExceptSridAndSlid } from '../../../utils/functions';

const MainPageMainPart = () => {
  const [searchParams] = useSearchParams();
  const isSearchParams = isSearchParamsExceptSridAndSlid(searchParams);

  return (
    <div className={classes.container}>
      <div className={classes.filtersRowContainer}>{isSearchParams && <FiltersRow />}</div>
      <div className={classes.filtersRowContainer}>
        <ProductList />
      </div>
    </div>
  );
};

export default MainPageMainPart;
