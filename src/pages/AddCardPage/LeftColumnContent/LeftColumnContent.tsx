import React from 'react';
import classes from './LeftColumnContent.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';

const LeftColumnContent: React.FC = () => {
  return (
    <>
      <div className={classes.title}>Карточка Товара</div>
      <div className={classes.cardContainer}>
        <ProductCard />
      </div>
    </>
  );
};

export default LeftColumnContent;
