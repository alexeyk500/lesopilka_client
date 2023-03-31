import React from 'react';
import classes from './FavoriteProductsCategorySelector.module.css';
import { QueryEnum } from '../../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorCategories } from '../../../../store/catalogSlice';
import { setSelectedCategoryId } from '../../../../store/favoriteSlice';
import FilterSelectorItem from '../../../UnitedPage/FilterSelectors/FilterSelectorItem/FilterSelectorItem';

const FavoriteProductsCategorySelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectorCategories);

  const onSelect = (id: number | undefined) => {
    dispatch(setSelectedCategoryId(id));
  };

  return (
    <div className={classes.container}>
      <FilterSelectorItem
        title={'Раздел каталога'}
        queryType={QueryEnum.CatalogCategory}
        options={categories}
        onSelect={onSelect}
        isExpand={true}
      />
    </div>
  );
};

export default FavoriteProductsCategorySelector;
