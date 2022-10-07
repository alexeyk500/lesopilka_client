import React, { useEffect } from 'react';
import classes from './ProductDetails.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  getCategorySizesThunk,
  getProductMaterialsThunk,
  selectorCatalogIsLoading,
} from '../../../../store/catalogSlice';
import Preloader from '../../../../components/Preloader/Preloader';
import CatalogSection from './CatalogSection/CatalogSection';
import SizesSection from './SizesSection/SizesSection';
import ProductCodeSection from './ProductCodeSection/ProductCodeSection';

const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectorCatalogIsLoading);

  useEffect(() => {
    dispatch(getProductMaterialsThunk());
    dispatch(getCategorySizesThunk());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.preloaderContainer}>
          <Preloader />
        </div>
      ) : (
        <div className={classes.scrollContainer}>
          <CatalogSection />
          <SizesSection />
          <ProductCodeSection />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
