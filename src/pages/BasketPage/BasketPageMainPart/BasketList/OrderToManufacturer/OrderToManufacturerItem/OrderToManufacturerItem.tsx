import React from 'react';
import classes from './OrderToManufacturerItem.module.css';
import { DriedEnum, ProductType, SepticEnum } from '../../../../../../types/types';
import {formatPrice, getProductSizesStr, onCloseDetailCard} from '../../../../../../utils/functions';
import AmountInput from '../../../../../../components/AmountInput/AmountInput';
import viewIco from '../../../../../../img/visibilityIcoOn.svg';
import deleteIco from '../../../../../../img/deleteBlueIco.svg';
import { toggleProductForBasketThunk } from '../../../../../../store/basketSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import { showConfirmPopUp } from '../../../../../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { getProductThunk, selectorBasketProducts } from '../../../../../../store/productSlice';
import { isFulfilled } from '@reduxjs/toolkit';
import {
  CloseDetailCardType,
  showDetailProductCardPopUp
} from '../../../../../../components/DetailProductCard/DetailProductCard';

type PropsType = {
  num: number;
  product: ProductType;
};

const OrderToManufacturerItem: React.FC<PropsType> = ({ num, product }) => {
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector(selectorBasketProducts);

  const productSizes = getProductSizesStr(product);

  const onConfirmDelete = (result: boolean | FormData | undefined) => {
    if (result) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (product?.id && token) {
        dispatch(toggleProductForBasketThunk({ productId: product.id, token }));
      }
    }
  };

  const onClickDeleteFromBasket = () => {
    showConfirmPopUp(
      `Пиломатериал\n${product?.subCategory?.title}\n${productSizes}\n\nбудет удален из корзины`,
      onConfirmDelete
    );
  };

  const onCloseDetailCardHandler = (result: CloseDetailCardType) => {
    onCloseDetailCard(result, dispatch, basketProducts)
  }

  const onClickViewProduct = () => {
    dispatch(getProductThunk(product.id)).then((result) => {
      if (isFulfilled(result)) {
        showDetailProductCardPopUp(result.payload, basketProducts, onCloseDetailCardHandler);
      }
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.numTitle}>{num}</div>
      <div className={classes.imageContainer}>
        {product.images?.[0] ? (
          <img src={product.images?.[0] || ''} className={classes.img} alt="product" />
        ) : (
          <div>No image</div>
        )}
      </div>
      <div className={classes.descriptionContainer}>
        <div className={classes.descriptionRow}>
          {product.subCategory?.title}
          {productSizes && `, ${productSizes} мм`}
        </div>
        <div className={classes.descriptionRow}>
          {product.material?.title.toLowerCase()}
          {product.sort?.title && `, ${product.sort?.title}`.toLowerCase()}
          {product.isSeptic && `, ${SepticEnum.septic}`.toLowerCase()}
          {product.isDried ? `, ${DriedEnum.dried}`.toLowerCase() : `, ${DriedEnum.noDried}`.toLowerCase()}
        </div>
        <div className={classes.descriptionRow}>{`артикул: ${product.code}`}</div>
      </div>
      <div className={classes.priceContainer}>
        <div className={classes.priceRow}>{formatPrice(product?.price)}</div>
        <div className={classes.priceRowLow}>{'руб.шт'}</div>
      </div>
      <div className={classes.amountColumn}>
        <AmountInput />
        <div className={classes.amountInfo}>
          <div className={classes.amountInfoWeight}>{`${125.0} кг.`}</div>
          <div className={classes.amountInfoSquare}>{`${34.7} м.кв.`}</div>
          <div className={classes.amountInfoVolume}>{`${2.5} м.куб.`}</div>
        </div>
      </div>
      <div className={classes.summColumn}>{`1245.88 руб.`}</div>
      <div className={classes.actionsColumn}>
        <div className={classes.actionContainer} onClick={onClickViewProduct}>
          <img src={viewIco} className={classes.viewIco} alt="view" />
        </div>
        <div className={classes.actionContainer} onClick={onClickDeleteFromBasket}>
          <img src={deleteIco} className={classes.deleteIco} alt="view" />
        </div>
      </div>
    </div>
  );
};

export default OrderToManufacturerItem;
