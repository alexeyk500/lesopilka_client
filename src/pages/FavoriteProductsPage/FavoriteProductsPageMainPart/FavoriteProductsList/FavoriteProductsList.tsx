import React, { useEffect, useState } from 'react';
import classes from './FavoriteProductsList.module.css';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorFavoriteProducts } from '../../../../store/favoriteSlice';
import { ProductType } from '../../../../types/types';
import ProductCard from '../../../../components/ProductCard/ProductCard';

const FavoriteProductsList: React.FC = () => {
  const products = useAppSelector(selectorFavoriteProducts);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  useEffect(() => {});

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className={classes.container}>
      <div className={classes.scrollContainer}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default FavoriteProductsList;
