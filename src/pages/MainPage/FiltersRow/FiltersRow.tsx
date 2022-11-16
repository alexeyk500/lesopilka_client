import React from 'react';
import classes from './FiltersRow.module.css';
import FilterSearch from './FilterSearch/FilterSearch';
import FilterSize from './FilterSize/FilterSize';
import { QueryEnum } from '../../../types/types';
import FilterOption from './FilterOption/FilterOption';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorCategories, selectorProductSorts, selectorSubCategories } from '../../../store/catalogSlice';
import { SEPTIC_OPTIONS } from '../../../utils/constants';

const FiltersRow: React.FC = () => {
  const sortsOptions = useAppSelector(selectorProductSorts);
  const categories = useAppSelector(selectorCategories);
  const subCategories = useAppSelector(selectorSubCategories);

  return (
    <div className={classes.container}>
      <FilterSearch />
      <FilterOption preTitle={'Раздел: '} options={categories} queryEnum={QueryEnum.CatalogCategory} />
      <FilterOption preTitle={'Пиломатериал: '} options={subCategories} queryEnum={QueryEnum.CatalogSubCategory} />
      <FilterSize queryEnumSize={QueryEnum.HeightSizeId} />
      <FilterSize queryEnumSize={QueryEnum.WeightSizeId} />
      <FilterSize queryEnumSize={QueryEnum.CaliberSizeId} />
      <FilterSize queryEnumSize={QueryEnum.LengthSizeId} />
      <FilterOption options={sortsOptions} queryEnum={QueryEnum.SortId} />
      <FilterOption options={SEPTIC_OPTIONS} queryEnum={QueryEnum.Septic} />
    </div>
  );
};

export default FiltersRow;
