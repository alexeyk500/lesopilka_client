import React, { useCallback } from 'react';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorFilters, setFiltersValue } from '../../../../store/productSlice';
import { selectorCategories } from '../../../../store/catalogSlice';
import { getOptionTitle, getValueFromFilter } from '../../../../utils/functions';

const FilterCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectorFilters);
  const categories = useAppSelector(selectorCategories);

  const getCategoryTitle = useCallback(() => {
    const categoryId = getValueFromFilter(filters, 'categoryId');
    if (typeof categoryId == 'number') {
      return getOptionTitle(categories, categoryId);
    }
    return undefined;
  }, [filters, categories]);
  const categoryTitle = getCategoryTitle();
  const resetCategoryFilter = () => {
    dispatch(setFiltersValue({ title: 'categoryId', value: undefined }));
  };

  return (
    <>
      {categoryTitle && (
        <ButtonComponent title={categoryTitle || ''} buttonType={ButtonType.FILTER} onClick={resetCategoryFilter} />
      )}
    </>
  );
};

export default FilterCategory;
