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
import { CALIBER_PRODUCT_CATEGORIES, DRIED_OPTIONS, SEPTIC_OPTIONS } from '../../../utils/constants';
import { useSearchParams } from 'react-router-dom';
import { selectorQueryFilters, updateQueryFilters } from '../../../store/productSlice';

const getFilterSizeOptions = (sizes: CategorySizeType[], categoryId: number | undefined, sizeType: SizeTypeEnum) => {
  const filteredSizes = sizes.filter(
    (categorySize) =>
      categorySize.categoryId === categoryId && !categorySize.isCustomSize && categorySize.type === sizeType
  );
  return filteredSizes.map((size) => {
    return { id: size.id, title: `${size.value} мм`, value: size.value };
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
      return getFilterSizeOptions(allCategorySizes, selectedCategoryId, SizeTypeEnum.height);
    }
    return [];
  }, [selectedCategoryId, allCategorySizes]);

  const widthSizes = useMemo(() => {
    if (selectedCategoryId) {
      return getFilterSizeOptions(allCategorySizes, selectedCategoryId, SizeTypeEnum.width);
    }
    return [];
  }, [selectedCategoryId, allCategorySizes]);

  const lengthSizes = useMemo(() => {
    if (selectedCategoryId) {
      return getFilterSizeOptions(allCategorySizes, selectedCategoryId, SizeTypeEnum.length);
    }
    return [];
  }, [selectedCategoryId, allCategorySizes]);

  const caliberSizes = useMemo(() => {
    if (selectedCategoryId) {
      return getFilterSizeOptions(allCategorySizes, selectedCategoryId, SizeTypeEnum.caliber);
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
          } else {
            const newSearchParams = new URLSearchParams();
            newSearchParams.append(QueryEnum.CatalogCategory, cid.toString());
            const mid = searchParams.get(QueryEnum.ManufacturerId);
            if (mid) {
              newSearchParams.append(QueryEnum.ManufacturerId, mid.toString());
            }
            setSearchParams(newSearchParams);
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
      {selectedCategoryId && CALIBER_PRODUCT_CATEGORIES.includes(selectedCategoryId) ? (
        <FilterSelectorItem
          title={'Диаметр'}
          queryType={QueryEnum.SizeCaliber}
          options={caliberSizes}
          onSelect={() => {
            setWhatFilterChangedRef(QueryEnum.SizeCaliber);
          }}
          isSizeSelector
        />
      ) : (
        <>
          <FilterSelectorItem
            title={'Толщина'}
            queryType={QueryEnum.SizeHeight}
            options={heightSizes}
            onSelect={() => {
              setWhatFilterChangedRef(QueryEnum.SizeHeight);
            }}
            isSizeSelector
          />
          <FilterSelectorItem
            title={'Ширина'}
            queryType={QueryEnum.SizeWidth}
            options={widthSizes}
            onSelect={() => {
              setWhatFilterChangedRef(QueryEnum.SizeWidth);
            }}
            isSizeSelector
          />
        </>
      )}
      <FilterSelectorItem
        title={'Длинна'}
        queryType={QueryEnum.SizeLength}
        options={lengthSizes}
        onSelect={() => {
          setWhatFilterChangedRef(QueryEnum.SizeLength);
        }}
        isSizeSelector
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
        title={'Влажность'}
        queryType={QueryEnum.Dried}
        options={DRIED_OPTIONS}
        onSelect={() => {
          setWhatFilterChangedRef(QueryEnum.Dried);
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
