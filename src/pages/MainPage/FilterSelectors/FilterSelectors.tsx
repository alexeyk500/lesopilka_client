import React from 'react';
import classes from './FilterSelectors.module.css';
import FilterSelectorItem from './FilterSelectorItem/FilterSelectorItem';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorCategories, selectorCategorySizes, selectorSubCategories } from '../../../store/catalogSlice';
import { selectorFilters } from '../../../store/productSlice';
import { getValueFromFilter } from '../../../utils/functions';
import { CategorySizeType, SizeTypeEnum } from '../../../types/types';

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

  return (
    <div className={classes.container}>
      <FilterSelectorItem title={'Раздел каталога'} filterTitle={'categoryId'} options={categories} isExpand />
      <FilterSelectorItem title={'Пиломатериал'} filterTitle={'subCategoryId'} options={subCategories} isExpand />
      <FilterSelectorItem title={'Толщина'} filterTitle={'heightId'} options={heightSizes} />
      <FilterSelectorItem title={'Ширина'} filterTitle={'widthId'} options={widthSizes} />
      <FilterSelectorItem title={'Длинна'} filterTitle={'lengthId'} options={lengthSizes} />
    </div>
  );
};

export default FilterSelectors;
