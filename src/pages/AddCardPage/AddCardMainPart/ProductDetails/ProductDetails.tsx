import React from 'react';
import classes from './ProductDetails.module.css';
import CategorySection from './CategorySection/CategorySection';
import SubCategorySection from './SubCategorySection/SubCategorySection';

const ProductDetails: React.FC = () => {
  return (
    <div className={classes.container}>
      <CategorySection />
      <SubCategorySection />
    </div>
  );
};

export default ProductDetails;
