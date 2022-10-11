import React, { useEffect } from 'react';
import classes from './ProductDetails.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  getCategorySizesThunk,
  getProductMaterialsThunk,
  getProductSortsThunk,
  selectorCatalogIsLoading,
} from '../../../../store/catalogSlice';
import Preloader from '../../../../components/Preloader/Preloader';
import CatalogSection from './CatalogSection/CatalogSection';
import ProductSizesSection from './ProductSizesSection/ProductSizesSection';
import ProductCodeSection from './ProductCodeSection/ProductCodeSection';
import ProductImagesSection from './ProductImagesSection/ProductImagesSection';
import ProductDescription from './ProductDescription/ProductDescription';
import ProductPriceSection from './ProductPriceSection/ProductPriceSection';
import ProductSortAndSepticSection from './ProductSortAndSepticSection/ProductSortAndSepticSection';

const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectorCatalogIsLoading);

  useEffect(() => {
    dispatch(getProductMaterialsThunk());
    dispatch(getProductSortsThunk());
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
          <ProductSizesSection />
          <ProductSortAndSepticSection />
          <ProductImagesSection />
          <ProductDescription />
          <ProductCodeSection />
          <ProductPriceSection />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
