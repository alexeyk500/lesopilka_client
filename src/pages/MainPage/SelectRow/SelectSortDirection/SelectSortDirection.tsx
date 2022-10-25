import React from 'react';
import classes from './SelectSortDirection.module.css';

const options = [
  { id: 1, title: 'Цена по убыванию' },
  { id: 2, title: 'Цена по возрастанию' },
];

const SelectSortDirection = () => {
  return (
    <div className={classes.container}>
      <select className={classes.select}>
        {options.map((option, ind) => {
          return (
            <option key={ind} value={option.id}>
              {option.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectSortDirection;
