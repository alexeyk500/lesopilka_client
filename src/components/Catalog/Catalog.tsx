import React from 'react';
import classes from './Catalog.module.css';
import CatalogItem from './CatalogItem/CatalogItem';
import { useAppSelector } from '../../hooks/hooks';
import { selectorCategories } from '../../store/catalogSlice';

const Catalog: React.FC = () => {
  const categories = useAppSelector(selectorCategories);

  return (
    <>
      <div className={classes.title}>Каталог</div>
      <div className={classes.scrollContainer}>
        {categories.map((category) => {
          return <CatalogItem key={category.id} category={category} />;
        })}
      </div>
    </>
  );
};

export default Catalog;
