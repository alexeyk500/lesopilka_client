import React, { useEffect, useState } from 'react';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorCategorySizes } from '../../../../store/catalogSlice';
import { QueryEnum } from '../../../../types/types';
import { useSearchParams } from 'react-router-dom';

const getSizeTitle = (queryEnumSize: QueryEnum, sizeValue: string) => {
  const sizeTitle =
    queryEnumSize === QueryEnum.HeightSizeId
      ? 'Толщина:'
      : queryEnumSize === QueryEnum.WeightSizeId
      ? 'Ширина:'
      : queryEnumSize === QueryEnum.LengthSizeId
      ? 'Длинна:'
      : queryEnumSize === QueryEnum.CaliberSizeId
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
  const allCategorySizes = useAppSelector(selectorCategorySizes);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSizeTile, setSelectedSizeTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    const sizeId = Number(searchParams.get(queryEnumSize));
    if (allCategorySizes && sizeId) {
      const size = allCategorySizes.find((curSize) => curSize.id === sizeId);
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
