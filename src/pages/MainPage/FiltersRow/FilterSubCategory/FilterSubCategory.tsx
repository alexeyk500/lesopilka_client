import React, { useCallback } from 'react';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorFilters, setFiltersValue } from '../../../../store/productSlice';
import { selectorSubCategories } from '../../../../store/catalogSlice';
import { getOptionTitle, getValueFromFilter } from '../../../../utils/functions';

const FilterSubCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectorFilters);
  const subCategories = useAppSelector(selectorSubCategories);

  const getCategoryTitle = useCallback(() => {
    const subCategoryId = getValueFromFilter(filters, 'subCategoryId');
    if (typeof subCategoryId == 'number') {
      return getOptionTitle(subCategories, subCategoryId);
    }
    return undefined;
  }, [filters, subCategories]);
  const categoryTitle = getCategoryTitle();

  const resetCategoryFilter = () => {
    dispatch(setFiltersValue({ title: 'subCategoryId', value: undefined }));
  };

  return (
    <>
      {categoryTitle && (
        <ButtonComponent title={categoryTitle || ''} buttonType={ButtonType.FILTER} onClick={resetCategoryFilter} />
      )}
    </>
  );
};

export default FilterSubCategory;
