import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorFilters, setFiltersValue } from '../../../../store/productSlice';
import { getOptionTitle, getValueFromFilter } from '../../../../utils/functions';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { SEPTIC_OPTIONS } from '../../../../utils/constants';

const FilterSeptic: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectorFilters);

  const getCategoryTitle = useCallback(() => {
    const categoryId = getValueFromFilter(filters, 'septicId');
    if (typeof categoryId == 'number') {
      return getOptionTitle(SEPTIC_OPTIONS, categoryId);
    }
    return undefined;
  }, [filters]);
  const categoryTitle = getCategoryTitle();
  const title = categoryTitle ? categoryTitle : '';
  const resetCategoryFilter = () => {
    dispatch(setFiltersValue({ title: 'septicId', value: undefined }));
  };

  return (
    <>
      {categoryTitle && <ButtonComponent title={title} buttonType={ButtonType.FILTER} onClick={resetCategoryFilter} />}
    </>
  );
};

export default FilterSeptic;
