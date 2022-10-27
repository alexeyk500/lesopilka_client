import React from 'react';
import classes from './FilterSelectors.module.css';
import FilterSelectorItem from './FilterSelectorItem/FilterSelectorItem';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorCategories, selectorSubCategories } from '../../../store/catalogSlice';
import { selectorFilters } from '../../../store/productSlice';
import { getValueFromFilter } from '../../../utils/functions';

const FilterSelectors: React.FC = () => {
  const filters = useAppSelector(selectorFilters);
  const categories = useAppSelector(selectorCategories);
  const subCategoriesState = useAppSelector(selectorSubCategories);

  const categoryId = getValueFromFilter(filters, 'categoryId');
  const subCategories = subCategoriesState.filter((subCategory) => subCategory.categoryId === categoryId);

  return (
    <div className={classes.container}>
      <FilterSelectorItem title={'Раздел каталога'} filterTitle={'categoryId'} options={categories}  />
      <FilterSelectorItem title={'Пиломатериал'} filterTitle={'subCategoryId'} options={subCategories} />
    </div>
  );
};

export default FilterSelectors;
