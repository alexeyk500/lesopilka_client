import { CloseDetailCardType, showDetailProductCardPopUp } from '../components/DetailProductCard/DetailProductCard';
import { useAppDispatch, useAppSelector } from './hooks';
import { getProductThunk, selectorBasketProducts } from '../store/productSlice';
import {
  createFavoriteProductThunk,
  deleteFavoriteProductThunk,
  getFavoriteProductsThunk,
  selectorFavoriteProducts,
} from '../store/favoriteSlice';
import { ProductType } from '../types/types';
import { isFulfilled } from '@reduxjs/toolkit';
import { AppDispatch } from '../store/store';
import { toggleProductForBasketThunk } from '../store/basketSlice';

export default function useShowDetailProductCardPopUp(product?: ProductType) {
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector(selectorBasketProducts);
  const favoriteProducts = useAppSelector(selectorFavoriteProducts);

  if (product) {
    return () => {
      const onCloseDetailCard = (
        { productId, isFavorite, isInBasket }: CloseDetailCardType,
        dispatch: AppDispatch,
        basketProducts: ProductType[],
        favoriteProducts: ProductType[]
      ) => {
        const basketProductIds = basketProducts.map((basketProduct) => basketProduct.id);
        if (basketProductIds.includes(productId)) {
          if (!isInBasket) {
            const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
            if (token) {
              dispatch(toggleProductForBasketThunk({ productId, token }));
            }
          }
        } else {
          if (isInBasket) {
            const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
            if (token) {
              dispatch(toggleProductForBasketThunk({ productId, token }));
            }
          }
        }

        const favoriteProduct = favoriteProducts.find((favProduct) => favProduct.id === productId);
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        if (favoriteProduct) {
          if (!isFavorite && token) {
            dispatch(deleteFavoriteProductThunk({ productId, token })).then(() => {
              dispatch(getFavoriteProductsThunk(token));
            });
          }
        } else {
          if (isFavorite && token) {
            dispatch(createFavoriteProductThunk({ productId, token })).then(() => {
              dispatch(getFavoriteProductsThunk(token));
            });
          }
        }
      };

      const onCloseDetailCardHandler = (result: CloseDetailCardType) => {
        onCloseDetailCard(result, dispatch, basketProducts, favoriteProducts);
      };

      dispatch(getProductThunk(product.id)).then((result) => {
        if (isFulfilled(result)) {
          showDetailProductCardPopUp(product, basketProducts, favoriteProducts, onCloseDetailCardHandler);
        }
      });
    };
  }
  return () => {};
}
