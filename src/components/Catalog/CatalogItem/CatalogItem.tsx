import React from 'react';
import classes from './CatalogItem.module.css';
import { CategoryType } from '../../../types/types';

type PropsType = {
  category: CategoryType;
  onClick?: (id: number) => void;
};

const CatalogItem: React.FC<PropsType> = ({ category, onClick }) => {
  const onClickHandler = () => {
    if (onClick && category.id) {
      onClick(category.id);
    }
  };

  return (
    <div className={classes.container} onClick={onClickHandler}>
      <div className={classes.title}>{category.title}</div>
      <div className={classes.imgContainer}>
        <img src={category.image} className={classes.img} alt="category item" />
      </div>
    </div>
  );
};

export default CatalogItem;
