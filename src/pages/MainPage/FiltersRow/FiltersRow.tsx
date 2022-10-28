import React from 'react';
import classes from './FiltersRow.module.css';
import FilterSearch from './FilterSearch/FilterSearch';
import FilterCategory from './FilterCategory/FilterCategory';
import FilterSubCategory from './FilterSubCategory/FilterSubCategory';
import FilterSize from './FilterSize/FilterSize';
import { SizeTypeEnum } from '../../../types/types';
import FilterSort from './FilterSort/FilterSort';
import FilterSeptic from './FilterSeptic/FilterSeptic';

const FiltersRow: React.FC = () => {
  return (
    <div className={classes.container}>
      <FilterSearch />
      <FilterCategory />
      <FilterSubCategory />
      <FilterSize sizeType={SizeTypeEnum.height} />
      <FilterSize sizeType={SizeTypeEnum.width} />
      <FilterSize sizeType={SizeTypeEnum.caliber} />
      <FilterSize sizeType={SizeTypeEnum.length} />
      <FilterSort />
      <FilterSeptic />
    </div>
  );
};

export default FiltersRow;
