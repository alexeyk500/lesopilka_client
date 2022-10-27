import React, { useCallback } from 'react';
import classes from './FilterSelectorItem.module.css';
import FilterSelector from '../../../../components/commonComponents/FilterSelector/FilterSelector';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorFilters, setFiltersValue } from '../../../../store/productSlice';
import { getValueFromFilter } from '../../../../utils/functions';
import { OptionsType } from '../../../../types/types';

type PropsType = {
  title: string;
  options: OptionsType[];
  filterTitle: string;
};

const FilterSelectorItem: React.FC<PropsType> = ({ title, options, filterTitle }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectorFilters);

  const getOptionId = useCallback(() => {
    const optionId = getValueFromFilter(filters, filterTitle);
    if (typeof optionId == 'number') {
      return optionId;
    }
    return undefined;
  }, [filters, filterTitle]);

  const selectedCategoryId = getOptionId();

  const onSelect = (id: number | undefined) => {
    dispatch(setFiltersValue({ title: filterTitle, value: id }));
  };

  return (
    <div className={classes.container}>
      <FilterSelector
        title={title}
        options={options}
        selectedOptionId={selectedCategoryId}
        onSelect={onSelect}
        isExpand
      />
    </div>
  );
};

export default FilterSelectorItem;
