import React from 'react';
import classes from './SelectRow.module.css';
import SelectSortDirection from './SelectSortDirection/SelectSortDirection';
import PriceRange from './PriceRange/PriceRange';
import FiltersResult from './FiltersResult/FiltersResult';

const SelectRow: React.FC = () => {
  return (
    <div className={classes.container}>
      <PriceRange />
      <SelectSortDirection />
      <FiltersResult />
    </div>
  );
};

export default SelectRow;