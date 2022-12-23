import React from 'react';
import classes from './FiltersResult.module.css';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorTotalProducts } from '../../../../store/productSlice';

const FiltersResult: React.FC = () => {
  const totalProducts = useAppSelector(selectorTotalProducts);

  return (
    <div className={classes.container}>
      <div className={classes.result}>{`Найдено ${totalProducts ?totalProducts :'0'} товаров`}</div>
    </div>
  );
};

export default FiltersResult;
