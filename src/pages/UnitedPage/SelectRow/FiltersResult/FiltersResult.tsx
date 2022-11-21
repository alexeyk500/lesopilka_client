import React from 'react';
import classes from './FiltersResult.module.css';

const FiltersResult: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.result}>Найдено 56 товаров</div>
    </div>
  );
};

export default FiltersResult;
