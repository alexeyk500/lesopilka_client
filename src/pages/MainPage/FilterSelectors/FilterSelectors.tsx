import React from 'react';
import classes from './FilterSelectors.module.css';
import FilterSelectorCategories from './FilterSelectorCategories/FilterSelectorCategories';

const FilterSelectors: React.FC = () => {
  return (
    <div className={classes.container}>
      <FilterSelectorCategories />
      <FilterSelectorCategories />
    </div>
  );
};

export default FilterSelectors;
