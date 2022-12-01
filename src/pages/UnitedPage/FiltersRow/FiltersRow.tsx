import React from 'react';
import classes from './FiltersRow.module.css';
import FilterSearch from './FilterSearch/FilterSearch';
import FilterSize from './FilterSize/FilterSize';
import { QueryEnum } from '../../../types/types';
import FilterOption from './FilterOption/FilterOption';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorCategories, selectorProductSorts, selectorSubCategories } from '../../../store/catalogSlice';
import { SEPTIC_OPTIONS } from '../../../utils/constants';
import FilterPrice from './FilterPrice/FilterPrice';

type PropsType = {
  isSalesPage?: boolean;
};

const FiltersRow: React.FC<PropsType> = ({ isSalesPage }) => {
  const sortsOptions = useAppSelector(selectorProductSorts);
  const categories = useAppSelector(selectorCategories);
  const subCategories = useAppSelector(selectorSubCategories);

  return (
    <div className={classes.container}>
      {!isSalesPage && <FilterSearch />}
      <FilterOption
        preTitle={'Раздел: '}
        options={categories}
        queryEnum={QueryEnum.CatalogCategory}
        resetAdditionQueryEnum={QueryEnum.CatalogSubCategory}
      />
      <FilterOption preTitle={'Пиломатериал: '} options={subCategories} queryEnum={QueryEnum.CatalogSubCategory} />
      <FilterSize queryEnumSize={QueryEnum.SizeHeight} />
      <FilterSize queryEnumSize={QueryEnum.SizeWidth} />
      <FilterSize queryEnumSize={QueryEnum.SizeCaliber} />
      <FilterSize queryEnumSize={QueryEnum.SizeLength} />
      <FilterOption options={sortsOptions} queryEnum={QueryEnum.SortId} />
      <FilterOption options={SEPTIC_OPTIONS} queryEnum={QueryEnum.Septic} />
      <FilterPrice queryEnum={QueryEnum.PriceFrom} />
      <FilterPrice queryEnum={QueryEnum.PriceTo} />
    </div>
  );
};

export default FiltersRow;
