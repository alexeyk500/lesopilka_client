import React, {useEffect, useMemo, useRef, useState} from 'react';
import classes from './FilterSelectors.module.css';
import FilterSelectorItem from './FilterSelectorItem/FilterSelectorItem';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  selectorCategories,
  selectorCategorySizes,
  selectorProductSorts,
  selectorSubCategories,
} from '../../../store/catalogSlice';
import { CategorySizeType, QueryEnum, SizeTypeEnum } from '../../../types/types';
import { BREVNO_CATEGORY_ID, SEPTIC_OPTIONS } from '../../../utils/constants';
import { useSearchParams } from 'react-router-dom';
import {getProductsThunk, selectorQueryFilters, updateQueryFilters} from '../../../store/productSlice';

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
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectorCategories);
  const sorts = useAppSelector(selectorProductSorts);
  const subCategoriesState = useAppSelector(selectorSubCategories);
  const allCategorySizes = useAppSelector(selectorCategorySizes);
  const queryFilters = useAppSelector(selectorQueryFilters);

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [filterChanged, setFilterChanged] = useState<QueryEnum | undefined>(undefined);

  useEffect(() => {
    searchParams.forEach((value, key) => {
      if (key === QueryEnum.CatalogCategory) {
        setSelectedCategoryId(Number(value));
      }
    });
  }, [searchParams]);

  const subCategories = useMemo(() => {
    return subCategoriesState.filter((subCategory) => subCategory.categoryId === selectedCategoryId);
  }, [selectedCategoryId, subCategoriesState]);

  const heightSizes = useMemo(() => {
    if (selectedCategoryId) {
      return getSizeOptions(allCategorySizes, selectedCategoryId, SizeTypeEnum.height);
    }
    return [];
  }, [selectedCategoryId, allCategorySizes]);

  const widthSizes = useMemo(() => {
    if (selectedCategoryId) {
      return getSizeOptions(allCategorySizes, selectedCategoryId, SizeTypeEnum.width);
    }
    return [];
  }, [selectedCategoryId, allCategorySizes]);

  const lengthSizes = useMemo(() => {
    if (selectedCategoryId) {
      return getSizeOptions(allCategorySizes, selectedCategoryId, SizeTypeEnum.length);
    }
    return [];
  }, [selectedCategoryId, allCategorySizes]);

  const caliberSizes = useMemo(() => {
    if (selectedCategoryId) {
      return getSizeOptions(allCategorySizes, selectedCategoryId, SizeTypeEnum.caliber);
    }
    return [];
  }, [selectedCategoryId, allCategorySizes]);

  const sendQueryToQueryFilter = () => {
    console.log('sendQueryToQueryFilter searchParams =', searchParams.toString());
    dispatch(updateQueryFilters(searchParams.toString()));
    // dispatch(sendQueryToQueryFilter()
    // console.log(searchParams.toString())
    // dispatch(getProductsThunk(searchParams));
  };

  // useEffect(() => {
  //   console.log('SearchParams changed', searchParams.toString());
  //   const scid = Number(searchParams.get(QueryEnum.CatalogSubCategory));
  //   console.log('scid =', scid);
  //   if (scid) {
  //     const queryFromFilter = queryFilters[scid];
  //     if (queryFromFilter) {
  //       console.log('queryFromFilter =', queryFromFilter);
  //       const newSearchParams = new URLSearchParams(queryFromFilter);
  //       console.log('will clearQueryFiltersByScid and setSearchParams');
  //       dispatch(clearQueryFiltersByScid(scid));
  //       setSearchParams(newSearchParams);
  //     } else {
  //       console.log('will update filter and getProductsThunk 1111');
  //       dispatch(updateQueryFilters(searchParams.toString()));
  //       dispatch(getProductsThunk(searchParams));
  //     }
  //   } else {
  //     console.log('will update filter and getProductsThunk 2222');
  //     dispatch(updateQueryFilters(searchParams.toString()));
  //     dispatch(getProductsThunk(searchParams));
  //   }
  // }, [dispatch, searchParams, queryFilters, setSearchParams]);

  useEffect(() => {
    console.log('SearchParams changed', searchParams.toString());
    console.log('filterCidOrScidChangedRef.current =', filterCidOrScidChangedRef.current);
    if (filterCidOrScidChangedRef.current) {
      console.log('filterCidOrScidChangedRef.current 22222 =', filterCidOrScidChangedRef.current);
      setFilterChanged(undefined);
    } else {
      dispatch(getProductsThunk(searchParams));
    }
  }, [dispatch, searchParams, filterChanged]);

  const filterCidOrScidChangedRef = useRef<QueryEnum | undefined>(undefined)

  const setWhatFilterChangedRef = (value: QueryEnum | undefined) => {
    filterCidOrScidChangedRef.current = value
  }

  return (
    <div className={classes.container}>
      <FilterSelectorItem
        title={'Раздел каталога'}
        queryType={QueryEnum.CatalogCategory}
        options={categories}
        onSelect={() => {
          setWhatFilterChangedRef(QueryEnum.CatalogCategory)
        }}
        isExpand={true}
      />
      <FilterSelectorItem
        title={'Пиломатериал'}
        queryType={QueryEnum.CatalogSubCategory}
        options={subCategories}
        onSelect={() => {
          setWhatFilterChangedRef(QueryEnum.CatalogSubCategory);
        }}
        isExpand={true}
      />
      {selectedCategoryId !== BREVNO_CATEGORY_ID ? (
        <>
          <FilterSelectorItem
            title={'Толщина'}
            queryType={QueryEnum.HeightSizeId}
            options={heightSizes}
            onSelect={sendQueryToQueryFilter}
          />
          <FilterSelectorItem
            title={'Ширина'}
            queryType={QueryEnum.WeightSizeId}
            options={widthSizes}
            onSelect={sendQueryToQueryFilter}
          />
        </>
      ) : (
        <FilterSelectorItem
          title={'Диаметр'}
          queryType={QueryEnum.CaliberSizeId}
          options={caliberSizes}
          onSelect={sendQueryToQueryFilter}
        />
      )}
      <FilterSelectorItem
        title={'Длинна'}
        queryType={QueryEnum.LengthSizeId}
        options={lengthSizes}
        onSelect={sendQueryToQueryFilter}
      />
      <FilterSelectorItem
        title={'Сорт'}
        queryType={QueryEnum.SortId}
        options={sorts}
        onSelect={sendQueryToQueryFilter}
      />
      <FilterSelectorItem
        title={'Антисептик'}
        queryType={QueryEnum.Septic}
        options={SEPTIC_OPTIONS}
        onSelect={sendQueryToQueryFilter}
      />
    </div>
  );
};

export default FilterSelectors;
