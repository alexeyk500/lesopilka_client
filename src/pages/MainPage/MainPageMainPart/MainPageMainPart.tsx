import React from 'react';
import classes from './MainPageMainPart.module.css';
import FiltersRow from '../FiltersRow/FiltersRow';
import SelectRow from '../SelectRow/SelectRow';
import ProductList from '../ProductList/ProductList';
import { useSearchParams } from 'react-router-dom';

const MainPageMainPart = () => {
  const [searchParams] = useSearchParams();
  const isSearchParams = !!searchParams.toString().length;

  return (
    <div className={classes.container}>
      <div className={classes.filtersRowContainer}>
        {isSearchParams && <FiltersRow />}
        {isSearchParams && <SelectRow />}
      </div>
      <ProductList />
    </div>
  );
};

export default MainPageMainPart;
