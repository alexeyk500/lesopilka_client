import React from 'react';
import classes from './CatalogItem.module.css';

type PropsType = {
  title: string;
  image: string;
};

const CatalogItem: React.FC<PropsType> = ({ title, image }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.imgContainer}>
        <img src={image} className={classes.img} alt="category item" />
      </div>
    </div>
  );
};

export default CatalogItem;
