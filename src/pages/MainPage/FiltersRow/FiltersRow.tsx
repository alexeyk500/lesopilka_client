import React from 'react';
import classes from './FiltersRow.module.css';
import FilterSearch from './FilterSearch/FilterSearch';
import FilterCategory from './FilterCategory/FilterCategory';
import FilterSubCategory from './FilterSubCategory/FilterSubCategory';

const FiltersRow: React.FC = () => {
  return (
    <div className={classes.container}>
      <FilterSearch />
      <FilterCategory />
      <FilterSubCategory />
    </div>
  );
};

export default FiltersRow;
