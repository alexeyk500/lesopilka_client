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
  isSizeSelector?: boolean;
};

const FilterSelectorItem: React.FC<PropsType> = ({ title, options, queryType, isExpand, onSelect, isSizeSelector }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOptionId, setSelectedOptionId] = useState<number | undefined>(undefined);

  useEffect(() => {
    let selectedOptionId: number | undefined = undefined;
    searchParams.forEach((value, key) => {
      if (isSizeSelector) {
        if (key === queryType && value) {
          const selectedOption = options.find((option) => option.value?.toString() === value);
          if (selectedOption) {
            selectedOptionId = Number(selectedOption.id);
          }
        }
      } else {
        if (key === queryType && Number(value)) {
          selectedOptionId = Number(value);
        }
      }
      setSelectedOptionId(selectedOptionId);
    });
  }, [searchParams, queryType, options, isSizeSelector]);

  const onSelectHandler = (id: number | undefined) => {
    if (id && id > 0) {
      if (isSizeSelector) {
        const selectedOption = options.find((option) => option.id === id);
        if (selectedOption && selectedOption.value) {
          searchParams.set(queryType as QueryEnum, selectedOption.value);
          setSearchParams(searchParams);
        }
      } else {
        searchParams.set(queryType as QueryEnum, id.toString());
        setSearchParams(searchParams);
      }
    }
    if (id === undefined) {
      setSelectedOptionId(undefined);
      searchParams.delete(queryType as QueryEnum);
      setSearchParams(searchParams);
    }
    onSelect && onSelect(id);
  };

  console.log('options =', options);

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
