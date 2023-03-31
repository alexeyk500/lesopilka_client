import { CloseDetailCardType, showDetailProductCardPopUp } from '../components/DetailProductCard/DetailProductCard';
import { useAppDispatch, useAppSelector } from './hooks';
import { getProductThunk, selectorBasketProducts } from '../store/productSlice';
import { selectorFavoriteProducts } from '../store/favoriteSlice';
import { onCloseDetailCard } from '../utils/functions';
import { ProductType } from '../types/types';
import { isFulfilled } from '@reduxjs/toolkit';

export default function useShowDetailProductCardPopUp(product?: ProductType) {
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector(selectorBasketProducts);
  const favoriteProducts = useAppSelector(selectorFavoriteProducts);

  if (product) {
    return () => {
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
