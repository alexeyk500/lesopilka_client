import React from 'react';
import classes from './ProductList.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { makeProductCardData } from '../../../utils/functions';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorProducts } from '../../../store/productSlice';

const ProductList = () => {
  const products = useAppSelector(selectorProducts);

  return (
    <div className={classes.container}>
      {products.map((product) => (
        <ProductCard key={product.id} productCardData={makeProductCardData(product)} isManufacturerProductCard />
      ))}
    </div>
  );
};

export default ProductList;
