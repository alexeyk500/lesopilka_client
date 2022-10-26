import React, { useCallback } from 'react';
import classes from './FiltersRow.module.css';
import ButtonComponent, { ButtonType } from '../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectorFilters, setFiltersValue } from '../../../store/productSlice';
import { selectorCategories } from '../../../store/catalogSlice';
import { FilterType, OptionsType } from '../../../types/types';
import { selectorUser, userUpdateThunk } from '../../../store/userSlice';
import { selectorRegions, selectorSearchLocationsByRegionId } from '../../../store/addressSlice';

const getValueFromFilter = (filters: FilterType[], title: string) => {
  const index = filters.findIndex((filter) => filter.title === title);
  if (index > -1) {
    return filters[index].value;
  }
  return undefined;
};

const getOptionTitle = (options: OptionsType[], optionId: number) => {
  const option = options.find((option) => option.id === optionId);
  if (option?.title) {
    return option.title;
  }
  return undefined;
};

const FiltersRow: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const filters = useAppSelector(selectorFilters);
  const categories = useAppSelector(selectorCategories);

  const regions = useAppSelector(selectorRegions);
  const searchLocationsByRegionId = useAppSelector(selectorSearchLocationsByRegionId);
  const searchRegionId = user?.searchRegion?.id;
  const searchLocationId = user?.searchLocation?.id;

  const getCategoryTitle = useCallback(() => {
    const categoryId = getValueFromFilter(filters, 'categoryId');
    if (typeof categoryId == 'number') {
      return getOptionTitle(categories, categoryId);
    }
    return undefined;
  }, [filters, categories]);
  const categoryTitle = getCategoryTitle();
  const resetCategoryFilter = () => {
    dispatch(setFiltersValue({ title: 'categoryId', value: undefined }));
  };

  const getSearchTitle = useCallback(() => {
    if (searchLocationId) {
      return getOptionTitle(searchLocationsByRegionId, searchLocationId);
    }
    if (searchRegionId) {
      return getOptionTitle(regions, searchRegionId);
    }
    return undefined;
  }, [regions, searchLocationsByRegionId, searchRegionId, searchLocationId]);
  const searchTitle = getSearchTitle();
  const resetSearch = () => {
    if (searchLocationId) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        dispatch(userUpdateThunk({ token, searchLocationId: null }));
      }
    } else {
      if (searchRegionId) {
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        if (token) {
          dispatch(userUpdateThunk({ token, searchRegionId: null }));
        }
      }
    }
  };

  return (
    <div className={classes.container}>
      {searchTitle && (
        <ButtonComponent title={searchTitle || ''} buttonType={ButtonType.FILTER} onClick={resetSearch} />
      )}
      {categoryTitle && (
        <ButtonComponent title={categoryTitle || ''} buttonType={ButtonType.FILTER} onClick={resetCategoryFilter} />
      )}
    </div>
  );
};

export default FiltersRow;
