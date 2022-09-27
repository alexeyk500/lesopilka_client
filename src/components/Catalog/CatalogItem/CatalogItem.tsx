import React from 'react';
import classes from './CatalogItem.module.css';

import img from '../../../img/BrevnoDelete.jpg'

const CatalogItem: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        Бревно
      </div>
      <div className={classes.imgContainer}>
        <img src={img} className={classes.img} alt="catalog item"/>
      </div>
    </div>
  );
};

export default CatalogItem;
