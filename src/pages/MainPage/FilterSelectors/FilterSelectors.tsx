import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { getProductsThunk, selectorQueryFilters, updateQueryFilters } from '../../../store/productSlice';

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

  useEffect(() => {
    if (filterChangedRef.current) {
      if (filterChangedRef.current === QueryEnum.CatalogCategory) {
        const cid = Number(searchParams.get(QueryEnum.CatalogCategory));
        if (cid > 0) {
          const queryFromQueryFilters = queryFilters[cid];
          if (queryFromQueryFilters) {
            setSearchParams(queryFromQueryFilters);
          }
        } else {
          const queryFromQueryFilters = queryFilters[0];
          if (queryFromQueryFilters) {
            setSearchParams(queryFromQueryFilters);
          }
        }
      } else {
        dispatch(updateQueryFilters(searchParams.toString()));
      }
      setWhatFilterChangedRef(undefined);
    } else {
      console.log('will getProductsThunk(searchParams) = ', searchParams.toString());
      dispatch(getProductsThunk(searchParams));
    }
  }, [dispatch, searchParams, queryFilters, setSearchParams]);

  const filterChangedRef = useRef<QueryEnum | undefined>(undefined);

  const setWhatFilterChangedRef = (value: QueryEnum | undefined) => {
    filterChangedRef.current = value;
  };

  return (
    <div className={classes.container}>
      <FilterSelectorItem
        title={'Раздел каталога'}
        queryType={QueryEnum.CatalogCategory}
        options={categories}
        onSelect={() => {
          setWhatFilterChangedRef(QueryEnum.CatalogCategory);
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
            onSelect={() => {
              setWhatFilterChangedRef(QueryEnum.HeightSizeId);
            }}
          />
          <FilterSelectorItem
            title={'Ширина'}
            queryType={QueryEnum.WeightSizeId}
            options={widthSizes}
            onSelect={() => {
              setWhatFilterChangedRef(QueryEnum.WeightSizeId);
            }}
          />
        </>
      ) : (
        <FilterSelectorItem
          title={'Диаметр'}
          queryType={QueryEnum.CaliberSizeId}
          options={caliberSizes}
          onSelect={() => {
            setWhatFilterChangedRef(QueryEnum.CaliberSizeId);
          }}
        />
      )}
      <FilterSelectorItem
        title={'Длинна'}
        queryType={QueryEnum.LengthSizeId}
        options={lengthSizes}
        onSelect={() => {
          setWhatFilterChangedRef(QueryEnum.LengthSizeId);
        }}
      />
      <FilterSelectorItem
        title={'Сорт'}
        queryType={QueryEnum.SortId}
        options={sorts}
        onSelect={() => {
          setWhatFilterChangedRef(QueryEnum.SortId);
        }}
      />
      <FilterSelectorItem
        title={'Антисептик'}
        queryType={QueryEnum.Septic}
        options={SEPTIC_OPTIONS}
        onSelect={() => {
          setWhatFilterChangedRef(QueryEnum.Septic);
        }}
      />
    </div>
  );
};

export default FilterSelectors;
