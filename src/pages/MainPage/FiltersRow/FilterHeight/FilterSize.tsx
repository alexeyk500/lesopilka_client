import React, { useCallback } from 'react';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorFilters, setFiltersValue } from '../../../../store/productSlice';
import { selectorCategorySizes } from '../../../../store/catalogSlice';
import { getOptionTitle, getValueFromFilter } from '../../../../utils/functions';
import { CategorySizeType, SizeTypeEnum } from '../../../../types/types';

const getSizeOptions = (sizes: CategorySizeType[], categoryId: number | undefined, sizeType: SizeTypeEnum) => {
  const sizeTitle =
    sizeType === SizeTypeEnum.height
      ? 'Толщина'
      : sizeType === SizeTypeEnum.width
      ? 'Ширина'
      : sizeType === SizeTypeEnum.length
      ? 'Длинна'
      : sizeType === SizeTypeEnum.caliber
      ? 'Диаметр'
      : undefined;
  const filteredSizes = sizes.filter(
    (categorySize) =>
      categorySize.categoryId === categoryId && !categorySize.isCustomSize && categorySize.type === sizeType
  );
  return filteredSizes.map((size) => {
    return { id: size.id, title: `${sizeTitle} ${size.value} мм` };
  });
};

type PropsType = {
  sizeType: SizeTypeEnum;
};

const FilterSize: React.FC<PropsType> = ({ sizeType }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectorFilters);
  const allCategorySizes = useAppSelector(selectorCategorySizes);

  const categoryId = getValueFromFilter(filters, 'categoryId');
  const filterSizeType =
    sizeType === SizeTypeEnum.height
      ? 'heightId'
      : sizeType === SizeTypeEnum.width
      ? 'widthId'
      : sizeType === SizeTypeEnum.length
      ? 'lengthId'
      : sizeType === SizeTypeEnum.caliber
      ? 'caliberId'
      : undefined;

  const getSizeTitle = useCallback(() => {
    if (filterSizeType) {
      const sizeId = getValueFromFilter(filters, filterSizeType);
      if (typeof sizeId == 'number') {
        const sizesOptions =
          categoryId && typeof categoryId === 'number' ? getSizeOptions(allCategorySizes, categoryId, sizeType) : [];
        return getOptionTitle(sizesOptions, sizeId);
      }
    }
    return undefined;
  }, [filters, allCategorySizes, filterSizeType, categoryId, sizeType]);
  const sizeTitle = getSizeTitle();

  const resetCategoryFilter = () => {
    dispatch(setFiltersValue({ title: filterSizeType, value: undefined }));
  };

  return (
    <>
      {sizeTitle && (
        <ButtonComponent title={sizeTitle || ''} buttonType={ButtonType.FILTER} onClick={resetCategoryFilter} />
      )}
    </>
  );
};

export default FilterSize;
