import React from 'react';
import { ProductType } from '../../types/types';
import { useAppDispatch } from '../../hooks/hooks';
import { toggleProductForBasketThunk } from '../../store/basketSlice';
import {
  showPopUpDeleteProductFromBasket,
  showPopUpDeleteProductFromFavorite,
} from '../InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { createFavoriteProductThunk, getFavoriteProductsThunk } from '../../store/favoriteSlice';
import ProductCardLayout from './ProductCardLayout';

type PropsType = {
  product?: ProductType;
  isAddProductCard?: boolean;
  isManufacturerProductCard?: boolean;
  onClick?: (id: number | undefined) => void;
  isPreview?: boolean;
};

const ProductCard: React.FC<PropsType> = ({
  product,
  isAddProductCard,
  isManufacturerProductCard,
  onClick,
  isPreview,
}) => {
  const dispatch = useAppDispatch();

  const onClickToBasket = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (product?.id && token) {
      if (product.amountInBasket) {
        showPopUpDeleteProductFromBasket(product, dispatch);
      } else {
        dispatch(toggleProductForBasketThunk({ productId: product.id, token }));
      }
    }
  };

  const onClickToFavorite = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (product?.id && token) {
      if (product.isFavorite) {
        showPopUpDeleteProductFromFavorite(product, dispatch);
      } else {
        dispatch(createFavoriteProductThunk({ productId: product.id, token })).then(() => {
          dispatch(getFavoriteProductsThunk(token));
        });
      }
    }
  };
  return (
    <ProductCardLayout
      product={product}
      isAddProductCard={isAddProductCard}
      isManufacturerProductCard={isManufacturerProductCard}
      onClick={onClick}
      isPreview={isPreview}
      onClickToBasket={onClickToBasket}
      onClickToFavorite={onClickToFavorite}
    />
  );
};

export default ProductCard;
