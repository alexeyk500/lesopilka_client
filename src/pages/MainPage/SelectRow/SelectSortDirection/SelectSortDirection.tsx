import React from 'react';
import classes from './SelectSortDirection.module.css';
import { ProductsSortsEnum } from '../../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorSorting, setSorting } from '../../../../store/productSlice';

const options = Object.entries(ProductsSortsEnum).map(([key, value]) => ({ key, value }));

const SelectSortDirection = () => {
  const dispatch = useAppDispatch();
  const sorting = useAppSelector(selectorSorting);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSorting(e.currentTarget.value));
  };

  return (
    <div className={classes.container}>
      <select value={sorting} className={classes.select} onChange={onChange}>
        {options.map((option) => {
          return (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectSortDirection;
