import React, { useEffect, useState } from 'react';
import classes from './SelectSortDirection.module.css';
import { QueryEnum, SortDirectionEnum, SortDirectionTitleEnum } from '../../../../types/types';
import { useSearchParams } from 'react-router-dom';

const options = Object.entries(SortDirectionEnum).map(([key, value]) => ({ key, value }));

const SelectSortDirection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortDirection, setSortDirection] = useState<SortDirectionEnum | undefined>(SortDirectionEnum.PriceASC);

  useEffect(() => {
    const sortDirectionQuery = searchParams.get(QueryEnum.SortDirection);
    if (!sortDirectionQuery) {
      const queryValue = options.find((option) => option.value === sortDirection)?.value;
      searchParams.append(QueryEnum.SortDirection, queryValue as string);
      setSearchParams(searchParams);
    }
  }, [searchParams, sortDirection, setSearchParams]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortDirection(e.currentTarget.value as SortDirectionEnum);
    searchParams.delete(QueryEnum.SortDirection);
    const queryValue = options.find((option) => option.key === e.currentTarget.value)?.value;
    if (queryValue) {
      searchParams.append(QueryEnum.SortDirection, queryValue);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className={classes.container}>
      <select value={sortDirection} className={classes.select} onChange={onChange}>
        {options.map((option) => {
          return (
            <option key={option.key} value={option.key}>
              {SortDirectionTitleEnum[option.value]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectSortDirection;
