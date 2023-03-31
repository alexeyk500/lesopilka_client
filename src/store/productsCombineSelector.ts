import { createSelector } from '@reduxjs/toolkit';
import { selectorBasketProducts, selectorRawProducts } from './productSlice';
import { selectorFavoriteProducts } from './favoriteSlice';

export const selectorProducts = createSelector(
  [selectorRawProducts, selectorBasketProducts, selectorFavoriteProducts],
  (products, basketProducts, favoriteProducts) => {
    const productsWithAmountInBasket = products.map((product) => {
      const basketProduct = basketProducts.find((basketProduct) => basketProduct.id === product.id);
      if (basketProduct) {
        return { ...product, amountInBasket: basketProduct.amountInBasket };
      }
      return product;
    });
    return productsWithAmountInBasket.map((product) => {
      const favoriteProduct = favoriteProducts.find((favoriteProduct) => favoriteProduct.id === product.id);
      if (favoriteProduct) {
        return { ...product, isFavorite: true };
      }
      return product;
    });
  }
);

export const selectorFavoriteProductsCombine = createSelector(
  [selectorBasketProducts, selectorFavoriteProducts],
  (basketProducts, favoriteProducts) => {
    return favoriteProducts.map((product) => {
      const basketProduct = basketProducts.find((basketProduct) => basketProduct.id === product.id);
      if (basketProduct) {
        return { ...product, isFavorite: true, amountInBasket: basketProduct.amountInBasket };
      }
      return { ...product, isFavorite: true };
    });
  }
);
