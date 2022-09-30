import React from 'react';
import classes from './ProductDetails.module.css';
import CategorySection from './CategorySection/CategorySection';

const ProductDetails: React.FC = () => {
  return (
    <div className={classes.container}>
      <CategorySection />
    </div>
  );
};

export default ProductDetails;
