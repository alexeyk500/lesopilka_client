import React from 'react';
import classes from './FilterSelectors.module.css';
import FilterSelectorItem from './FilterSelectorItem/FilterSelectorItem';
import { useAppSelector } from '../../../hooks/hooks';
import {
  selectorCategories,
  selectorCategorySizes,
  selectorProductSorts,
  selectorSubCategories,
} from '../../../store/catalogSlice';
import { selectorFilters } from '../../../store/productSlice';
import { getValueFromFilter } from '../../../utils/functions';
import { CategorySizeType, SizeTypeEnum } from '../../../types/types';
import { BREVNO_CATEGORY_ID } from '../../../utils/constants';
import { SEPTIC_OPTIONS } from '../../../utils/constants';

const getSizeOptions = (sizes: CategorySizeType[], categoryId: number | undefined, sizeType: SizeTypeEnum) => {
  const filteredSizes = sizes.filter(
    (categorySize) =>
      categorySize.categoryId === categoryId && !categorySize.isCustomSize && categorySize.type === sizeType
  );
  return filteredSizes.map((size) => {
    return { id: size.id, title: `${size.value} мм` };
  });
};

const FilterSelectors: React.FC = () => {
  const filters = useAppSelector(selectorFilters);
  const categories = useAppSelector(selectorCategories);
  const sorts = useAppSelector(selectorProductSorts);
  const subCategoriesState = useAppSelector(selectorSubCategories);
  const allCategorySizes = useAppSelector(selectorCategorySizes);

  const categoryId = getValueFromFilter(filters, 'categoryId');
  const subCategories = subCategoriesState.filter((subCategory) => subCategory.categoryId === categoryId);
  const heightSizes =
    categoryId && typeof categoryId === 'number'
      ? getSizeOptions(allCategorySizes, categoryId, SizeTypeEnum.height)
      : [];
  const widthSizes =
    categoryId && typeof categoryId === 'number'
      ? getSizeOptions(allCategorySizes, categoryId, SizeTypeEnum.width)
      : [];
  const lengthSizes =
    categoryId && typeof categoryId === 'number'
      ? getSizeOptions(allCategorySizes, categoryId, SizeTypeEnum.length)
      : [];
  const caliberSizes =
    categoryId && typeof categoryId === 'number'
      ? getSizeOptions(allCategorySizes, categoryId, SizeTypeEnum.caliber)
      : [];

  return (
    <div className={classes.container}>
      <FilterSelectorItem title={'Раздел каталога'} filterTitle={'categoryId'} options={categories} isExpand />
      <FilterSelectorItem title={'Пиломатериал'} filterTitle={'subCategoryId'} options={subCategories} isExpand />
      {categoryId !== BREVNO_CATEGORY_ID && (
        <FilterSelectorItem title={'Толщина'} filterTitle={'heightId'} options={heightSizes} />
      )}
      {categoryId !== BREVNO_CATEGORY_ID && (
        <FilterSelectorItem title={'Ширина'} filterTitle={'widthId'} options={widthSizes} />
      )}
      {categoryId === BREVNO_CATEGORY_ID && (
        <FilterSelectorItem title={'Диаметр'} filterTitle={'caliberId'} options={caliberSizes} />
      )}
      <FilterSelectorItem title={'Длинна'} filterTitle={'lengthId'} options={lengthSizes} />
      <FilterSelectorItem title={'Сорт'} filterTitle={'sortId'} options={sorts} />
      <FilterSelectorItem title={'Антисептик'} filterTitle={'septicId'} options={SEPTIC_OPTIONS} />
    </div>
  );
};

export default FilterSelectors;
