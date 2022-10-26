import React, { useCallback } from 'react';
import classes from './FilterSelectorCategories.module.css';
import FilterSelector from '../../../../components/commonComponents/FilterSelector/FilterSelector';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorCategories } from '../../../../store/catalogSlice';
import { selectorFilters, setFiltersValue } from '../../../../store/productSlice';
import { getValueFromFilter } from '../../../../utils/functions';

const FilterSelectorCategories: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectorCategories);

  const filters = useAppSelector(selectorFilters);

  const getCategoryId = useCallback(() => {
    const categoryId = getValueFromFilter(filters, 'categoryId');
    if (typeof categoryId == 'number') {
      return categoryId;
    }
    return undefined;
  }, [filters]);

  const selectedCategoryId = getCategoryId();

  const onSelect = (id: number) => {
    dispatch(setFiltersValue({ title: 'categoryId', value: id }));
  };

  return (
    <div className={classes.container}>
      <FilterSelector
        title={'Раздел каталога'}
        options={categories}
        selectedOptionId={selectedCategoryId}
        onSelect={onSelect}
        isExpand
      />
    </div>
  );
};

export default FilterSelectorCategories;
