import React from 'react';
import classes from './Catalog.module.css';
import CatalogItem from './CatalogItem/CatalogItem';
import { useAppSelector } from '../../hooks/hooks';
import { selectorCategories } from '../../store/catalogSlice';

type PropsType = {
  onClickCatalogCategory?: (id: number) => void;
};

const Catalog: React.FC<PropsType> = ({ onClickCatalogCategory }) => {
  const categories = useAppSelector(selectorCategories);

  return (
    <div className={classes.container}>
      {categories.map((category) => {
        return <CatalogItem key={category.id} category={category} onClick={onClickCatalogCategory} />;
      })}
    </div>
  );
};

export default Catalog;
