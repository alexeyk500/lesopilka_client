import React from 'react';
import classes from './Catalog.module.css';
import CatalogItem from './CatalogItem/CatalogItem';

const Catalog: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Каталог</div>
      <div className={classes.scrollContainer}>
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
      </div>
    </div>
  );
};

export default Catalog;
