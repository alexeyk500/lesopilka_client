import React, { useEffect, useState } from 'react';
import classes from './FilterSelectorItem.module.css';
import FilterSelector from '../../../../components/commonComponents/FilterSelector/FilterSelector';
import { OptionsType, QueryEnum } from '../../../../types/types';
import { useSearchParams } from 'react-router-dom';

type PropsType = {
  title: string;
  options: OptionsType[];
  queryType?: QueryEnum;
  isExpand?: boolean;
  onSelect?: (id: number | undefined) => void;
};

const FilterSelectorItem: React.FC<PropsType> = ({ title, options, queryType, isExpand, onSelect }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOptionId, setSelectedOptionId] = useState<number | undefined>(undefined);

  useEffect(() => {
    let valueToSet: number | undefined = undefined;
    searchParams.forEach((value, key) => {
      if (key === queryType && Number(value)) {
        valueToSet =Number(value);
      }
      setSelectedOptionId(valueToSet);
    });
  }, [searchParams, queryType]);

  const onSelectHandler = (id: number | undefined) => {
    if (id && id > 0) {
      searchParams.set(queryType as QueryEnum, id.toString());
      setSearchParams(searchParams);
    }
    if (id === undefined) {
      setSelectedOptionId(undefined);
      searchParams.delete(queryType as QueryEnum);
      setSearchParams(searchParams);
    }
    onSelect && onSelect(id);
  };

  return (
    <div className={classes.container}>
      <FilterSelector
        title={title}
        options={options}
        selectedOptionId={selectedOptionId}
        onSelect={onSelectHandler}
        isExpand={isExpand}
      />
    </div>
  );
};

export default FilterSelectorItem;
