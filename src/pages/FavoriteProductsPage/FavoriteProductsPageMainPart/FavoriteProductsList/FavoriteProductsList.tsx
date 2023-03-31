import React, { useEffect, useState } from 'react';
import classes from './FavoriteProductsList.module.css';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorFavoriteProducts, selectorFavoriteProductsSelectedCategoryId } from '../../../../store/favoriteSlice';
import { ProductType } from '../../../../types/types';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { selectorCategories, selectorSubCategories } from '../../../../store/catalogSlice';

const FavoriteProductsList: React.FC = () => {
  const products = useAppSelector(selectorFavoriteProducts);
  const categories = useAppSelector(selectorCategories);
  const subCategories = useAppSelector(selectorSubCategories);
  const selectedCategoryId = useAppSelector(selectorFavoriteProductsSelectedCategoryId);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  const selectedCategory = categories.find((category) => category.id === selectedCategoryId);

  useEffect(() => {
    if (selectedCategoryId) {
      const filteredProducts = products.filter((product) => {
        const productSubCategoryId = product.subCategory?.id;
        const productCategory = subCategories.find((subCategory) => subCategory.id === productSubCategoryId);
        return productCategory?.categoryId === selectedCategoryId;
      });
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [products, subCategories, selectedCategoryId]);

  return (
    <div className={classes.container}>
      <div className={classes.scrollContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} onClick={() => {}} />)
        ) : (
          <div className={classes.emptyList}>
            {selectedCategory
              ? `Ваш список избранных товаров в разделе "${selectedCategory.title}" пока еще пустой...`
              : 'Ваш список избранных товаров пока еще пустой...'}
          </div>
        )}
        {}
      </div>
    </div>
  );
};

export default FavoriteProductsList;
