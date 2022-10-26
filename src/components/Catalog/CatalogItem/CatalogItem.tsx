import React from 'react';
import classes from './CatalogItem.module.css';
import { CategoryType } from '../../../types/types';
import { useAppDispatch } from '../../../hooks/hooks';
import { setFiltersValue } from '../../../store/productSlice';

type PropsType = {
  category: CategoryType;
};

const CatalogItem: React.FC<PropsType> = ({ category }) => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(setFiltersValue({ title: 'categoryId', value: category.id }));
  };

  return (
    <div className={classes.container} onClick={onClick}>
      <div className={classes.title}>{category.title}</div>
      <div className={classes.imgContainer}>
        <img src={category.image} className={classes.img} alt="category item" />
      </div>
    </div>
  );
};

export default CatalogItem;
