import React from 'react';
import classes from './FiltersRow.module.css';
import FilterSearch from './FilterSearch/FilterSearch';
import FilterCategory from './FilterCategory/FilterCategory';

const FiltersRow: React.FC = () => {
  return (
    <div className={classes.container}>
      <FilterSearch />
      <FilterCategory />
    </div>
  );
};

export default FiltersRow;
