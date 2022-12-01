import React, { useEffect, useState } from 'react';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorCategorySizes } from '../../../../store/catalogSlice';
import { QueryEnum, QueryToSizeEnum } from '../../../../types/types';
import { useSearchParams } from 'react-router-dom';
import { updateQueryFilters } from '../../../../store/productSlice';

const getSizeTitle = (queryEnumSize: QueryEnum, sizeValue: string) => {
  const sizeTitle =
    queryEnumSize === QueryEnum.SizeHeight
      ? 'Толщина:'
      : queryEnumSize === QueryEnum.SizeWidth
      ? 'Ширина:'
      : queryEnumSize === QueryEnum.SizeLength
      ? 'Длинна:'
      : queryEnumSize === QueryEnum.SizeCaliber
      ? 'Диаметр:'
      : undefined;
  if (sizeTitle) {
    return `${sizeTitle} ${sizeValue} мм`;
  }
  return undefined;
};

type PropsType = {
  queryEnumSize: QueryEnum;
};

const FilterSize: React.FC<PropsType> = ({ queryEnumSize }) => {
  const dispatch = useAppDispatch();
  const allCategorySizes = useAppSelector(selectorCategorySizes);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSizeTile, setSelectedSizeTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    const sizeValue = searchParams.get(queryEnumSize);
    if (
      sizeValue &&
      (queryEnumSize === QueryEnum.SizeHeight ||
        queryEnumSize === QueryEnum.SizeWidth ||
        queryEnumSize === QueryEnum.SizeLength ||
        queryEnumSize === QueryEnum.SizeCaliber)
    ) {
      const size = allCategorySizes.find(
        (curSize) => curSize.value.toString() === sizeValue && curSize.type === QueryToSizeEnum[queryEnumSize]
      );
      if (size) {
        const title = getSizeTitle(queryEnumSize, size.value);
        if (title) {
          setSelectedSizeTitle(title);
        }
      }
    } else {
      setSelectedSizeTitle(undefined);
    }
  }, [searchParams, allCategorySizes, queryEnumSize]);

  const resetCategoryFilter = () => {
    searchParams.delete(queryEnumSize);
    dispatch(updateQueryFilters(searchParams.toString()));
    setSearchParams(searchParams);
  };

  return (
    <>
      {selectedSizeTile && (
        <ButtonComponent title={selectedSizeTile || ''} buttonType={ButtonType.FILTER} onClick={resetCategoryFilter} />
      )}
    </>
  );
};

export default FilterSize;
