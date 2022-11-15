import React, { useEffect, useMemo, useState } from 'react';
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
import { getProductsThunk, selectorQueryFilters, updateQueryFilter } from '../../../store/productSlice';

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

  const updateProductsBySearchParams = () => {
    // console.log(searchParams.toString())
    // dispatch(updateQueryFilter(searchParams.toString()));
    // dispatch(getProductsThunk(searchParams));
  };

  useEffect(() => {
    console.log('SearchParams changed', searchParams.toString());
    dispatch(getProductsThunk(searchParams));
  }, [dispatch, searchParams]);

  const onChangeCatalogSubCategory = (id: number | undefined) => {
    // const currentSearchParams = searchParams.toString()
    // const cid = Number(searchParams.get(QueryEnum.CatalogSubCategory))
    // if (cid && cid > 0) {
    //   const filterSearchParamsStr = queryFilters[cid] || '';
    //   const filterSearchParams = new URLSearchParams(filterSearchParamsStr);
    //   dispatch(getProductsThunk(filterSearchParams));
    // } else {
    //   dispatch(getProductsThunk(searchParams));
    // }
    // dispatch(updateQueryFilter(currentSearchParams.toString()));
  };

  return (
    <div className={classes.container}>
      <FilterSelectorItem
        title={'Раздел каталога'}
        queryType={QueryEnum.CatalogCategory}
        options={categories}
        onSelect={updateProductsBySearchParams}
        isExpand={true}
      />
      <FilterSelectorItem
        title={'Пиломатериал'}
        queryType={QueryEnum.CatalogSubCategory}
        options={subCategories}
        onSelect={onChangeCatalogSubCategory}
        isExpand={true}
      />
      {selectedCategoryId !== BREVNO_CATEGORY_ID ? (
        <>
          <FilterSelectorItem
            title={'Толщина'}
            queryType={QueryEnum.HeightSizeId}
            options={heightSizes}
            onSelect={updateProductsBySearchParams}
          />
          <FilterSelectorItem
            title={'Ширина'}
            queryType={QueryEnum.WeightSizeId}
            options={widthSizes}
            onSelect={updateProductsBySearchParams}
          />
        </>
      ) : (
        <FilterSelectorItem
          title={'Диаметр'}
          queryType={QueryEnum.CaliberSizeId}
          options={caliberSizes}
          onSelect={updateProductsBySearchParams}
        />
      )}
      <FilterSelectorItem
        title={'Длинна'}
        queryType={QueryEnum.LengthSizeId}
        options={lengthSizes}
        onSelect={updateProductsBySearchParams}
      />
      <FilterSelectorItem
        title={'Сорт'}
        queryType={QueryEnum.SortId}
        options={sorts}
        onSelect={updateProductsBySearchParams}
      />
      <FilterSelectorItem
        title={'Антисептик'}
        queryType={QueryEnum.Septic}
        options={SEPTIC_OPTIONS}
        onSelect={updateProductsBySearchParams}
      />
    </div>
  );
};

export default FilterSelectors;
