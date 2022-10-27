import React from 'react';
import classes from './FiltersRow.module.css';
import FilterSearch from './FilterSearch/FilterSearch';
import FilterCategory from './FilterCategory/FilterCategory';
import FilterSubCategory from './FilterSubCategory/FilterSubCategory';
import FilterSize from './FilterHeight/FilterSize';
import { SizeTypeEnum } from '../../../types/types';

const FiltersRow: React.FC = () => {
  return (
    <div className={classes.container}>
      <FilterSearch />
      <FilterCategory />
      <FilterSubCategory />
      <FilterSize sizeType={SizeTypeEnum.height} />
      <FilterSize sizeType={SizeTypeEnum.width} />
      <FilterSize sizeType={SizeTypeEnum.length} />
    </div>
  );
};

export default FiltersRow;
