import React, { useCallback, useEffect, useState } from 'react';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorCategories } from '../../../../store/catalogSlice';
import { getOptionTitle } from '../../../../utils/functions';
import { useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../../../types/types';

const FilterCategory: React.FC = () => {
  const categories = useAppSelector(selectorCategories);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);

  useEffect(() => {
    searchParams.forEach((value, key) => {
      if (key === QueryEnum.CatalogCategory) {
        setSelectedCategoryId(Number(value));
      }
    });
  }, [searchParams]);

  const getCategoryTitle = useCallback(() => {
    if (selectedCategoryId) {
      return getOptionTitle(categories, selectedCategoryId);
    }
    return undefined;
  }, [categories, selectedCategoryId]);

  const categoryTitle = getCategoryTitle();
  const title = 'Раздел: ' + categoryTitle;

  const resetCategoryFilter = () => {
    searchParams.delete(QueryEnum.CatalogCategory);
    setSearchParams(searchParams);
  };

  return (
    <>
      {categoryTitle && <ButtonComponent title={title} buttonType={ButtonType.FILTER} onClick={resetCategoryFilter} />}
    </>
  );
};

export default FilterCategory;
