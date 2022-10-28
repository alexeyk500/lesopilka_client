import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorFilters, setFiltersValue } from '../../../../store/productSlice';
import { selectorProductSorts } from '../../../../store/catalogSlice';
import { getOptionTitle, getValueFromFilter } from '../../../../utils/functions';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';

const FilterSort: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectorFilters);
  const sorts = useAppSelector(selectorProductSorts);

  const getCategoryTitle = useCallback(() => {
    const categoryId = getValueFromFilter(filters, 'sortId');
    if (typeof categoryId == 'number') {
      return getOptionTitle(sorts, categoryId);
    }
    return undefined;
  }, [filters, sorts]);
  const categoryTitle = getCategoryTitle();
  const title = categoryTitle ? categoryTitle : '';
  const resetCategoryFilter = () => {
    dispatch(setFiltersValue({ title: 'sortId', value: undefined }));
  };

  return (
    <>
      {categoryTitle && <ButtonComponent title={title} buttonType={ButtonType.FILTER} onClick={resetCategoryFilter} />}
    </>
  );
};

export default FilterSort;
