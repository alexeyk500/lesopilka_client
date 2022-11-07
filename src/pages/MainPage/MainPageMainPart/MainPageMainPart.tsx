import React from 'react';
import classes from './MainPageMainPart.module.css';
import { getValueFromFilter } from '../../../utils/functions';
import FiltersRow from '../FiltersRow/FiltersRow';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorFilters } from '../../../store/productSlice';
import SelectRow from '../SelectRow/SelectRow';
import ProductList from '../ProductList/ProductList';

const MainPageMainPart = () => {
  const filters = useAppSelector(selectorFilters);
  const categoryId = getValueFromFilter(filters, 'categoryId');

  return (
    <div className={classes.container}>
      <div className={classes.filtersRowContainer}>
        {categoryId && <FiltersRow />}
        {categoryId && <SelectRow />}
      </div>
      <ProductList />
    </div>
  );
};

export default MainPageMainPart;
