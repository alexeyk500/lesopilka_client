import React from 'react';
import classes from './ProductList.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { makeProductCardData } from '../../../utils/functions';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorProducts, selectorProductsLoading } from '../../../store/productSlice';
import Preloader from '../../../components/Preloader/Preloader';

const ProductList = () => {
  const products = useAppSelector(selectorProducts);
  const isLoading = useAppSelector(selectorProductsLoading);

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.preloaderContainer}>
          <Preloader />
        </div>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} productCardData={makeProductCardData(product)} isManufacturerProductCard />
        ))
      )}
    </div>
  );
};

export default ProductList;
