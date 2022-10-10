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
import SizesSection from './SizesSection/SizesSection';
import ProductCodeSection from './ProductCodeSection/ProductCodeSection';
import ImagesSection from './ImagesSection/ImagesSection';
import ProductSortSection from './ProductSortSection/ProductSortSection';
import ProductSepticSection from "./ProductSepticSection/ProductSepticSection";

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
          <SizesSection />
          <ProductCodeSection />
          <ImagesSection />
          <ProductSortSection />
          <ProductSepticSection />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
