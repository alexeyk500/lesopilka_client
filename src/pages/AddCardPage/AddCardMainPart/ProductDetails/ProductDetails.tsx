import React, { useEffect } from 'react';
import classes from './ProductDetails.module.css';
import CategorySection from './CategorySection/CategorySection';
import SubCategorySection from './SubCategorySection/SubCategorySection';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { getProductMaterialsThunk, selectorCatalogIsLoading } from '../../../../store/catalogSlice';
import Preloader from '../../../../components/Preloader/Preloader';
import ProductMaterialSection from './ProductMaterialSection/ProductMaterialSection';

const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectorCatalogIsLoading);

  useEffect(() => {
    dispatch(getProductMaterialsThunk());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.preloaderContainer}>
          <Preloader />
        </div>
      ) : (
        <>
          <CategorySection />
          <SubCategorySection />
          <ProductMaterialSection />
        </>
      )}
    </div>
  );
};

export default ProductDetails;
