import React, { useCallback, useEffect, useState } from 'react';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorSubCategories } from '../../../../store/catalogSlice';
import { getOptionTitle } from '../../../../utils/functions';
import { useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../../../types/types';

const FilterSubCategory: React.FC = () => {
  const subCategories = useAppSelector(selectorSubCategories);

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | undefined>(undefined);

  useEffect(() => {
    let valueToSet: number | undefined = undefined;
    searchParams.forEach((value, key) => {
      if (key === QueryEnum.CatalogSubCategory && Number(value)) {
        valueToSet = Number(value);
      }
      setSelectedSubCategoryId(valueToSet);
    });
  }, [searchParams]);

  const getSubCategoryTitle = useCallback(() => {
    if (selectedSubCategoryId) {
      return getOptionTitle(subCategories, selectedSubCategoryId);
    }
    return undefined;
  }, [subCategories, selectedSubCategoryId]);

  const categoryTitle = getSubCategoryTitle();
  const title = 'Тип: ' + categoryTitle;

  const resetCategoryFilter = () => {
    searchParams.delete(QueryEnum.CatalogSubCategory);
    setSearchParams(searchParams);
  };

  return (
    <>
      {categoryTitle && <ButtonComponent title={title} buttonType={ButtonType.FILTER} onClick={resetCategoryFilter} />}
    </>
  );
};

export default FilterSubCategory;
