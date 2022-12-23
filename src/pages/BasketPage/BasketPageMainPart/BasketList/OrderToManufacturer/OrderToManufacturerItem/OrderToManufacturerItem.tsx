import React, { useState } from 'react';
import classes from './OrderToManufacturerItem.module.css';
import { DriedEnum, ProductType, SepticEnum } from '../../../../../../types/types';
import {
  formatPrice,
  getLogisticInfo,
  getProductSizesStr,
  onCloseDetailCard,
  toStrWithDelimiter,
} from '../../../../../../utils/functions';
import AmountInput from '../../../../../../components/AmountInput/AmountInput';
import deleteIco from '../../../../../../img/deleteBlueIco.svg';
import { toggleProductForBasketThunk, updateBasketProductAmountThunk } from '../../../../../../store/basketSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import { showConfirmPopUp } from '../../../../../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { getProductThunk, selectorBasketProducts } from '../../../../../../store/productSlice';
import { isFulfilled } from '@reduxjs/toolkit';
import {
  CloseDetailCardType,
  showDetailProductCardPopUp,
} from '../../../../../../components/DetailProductCard/DetailProductCard';
import useDebouncedFunction from '../../../../../../hooks/useDebounceFunction';
import { DEBOUNCE_TIME, MAX_BASKET_PRODUCT_AMOUNT } from '../../../../../../utils/constants';

type PropsType = {
  num: number;
  product: ProductType;
};

const OrderToManufacturerItem: React.FC<PropsType> = ({ num, product }) => {
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector(selectorBasketProducts);

  const productSizes = getProductSizesStr(product);

  const [amount, setAmount] = useState(product.amountInBasket ? product.amountInBasket : 0);

  const { square, weight, volume, summ } = getLogisticInfo(product, amount);

  const onChangeAmount = (newValue: number | string) => {
    if (typeof newValue === 'number') {
      if (newValue > 0 && newValue <= MAX_BASKET_PRODUCT_AMOUNT) {
        setAmount(newValue);
        debounceUpdateAmount({ productId: product.id, amount: newValue });
      }
    } else {
      const numberNewValue = Number(newValue);
      if (numberNewValue) {
        if (numberNewValue <= MAX_BASKET_PRODUCT_AMOUNT) {
          setAmount(numberNewValue);
          debounceUpdateAmount({ productId: product.id, amount: numberNewValue });
        }
      } else {
        setAmount(0);
      }
    }
  };
  const debounceUpdateAmount = useDebouncedFunction(
    (updateData) => {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token && updateData) {
        dispatch(updateBasketProductAmountThunk({ productId: updateData.productId, amount: updateData.amount, token }));
      }
    },
    DEBOUNCE_TIME,
    true
  );

  const onConfirmDelete = (result: boolean | FormData | undefined) => {
    if (result) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (product?.id && token) {
        dispatch(toggleProductForBasketThunk({ productId: product.id, token }));
      }
    }
  };

  const onClickDeleteFromBasket = () => {
    showConfirmPopUp(`${product?.subCategory?.title}\n${productSizes}\n\nбудет удален из корзины`, onConfirmDelete);
  };

  const onCloseDetailCardHandler = (result: CloseDetailCardType) => {
    onCloseDetailCard(result, dispatch, basketProducts);
  };

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
      <div className={classes.viewContainer}>
        <div className={classes.imageContainer} onClick={onClickViewProduct}>
          {product.images?.[0] ? (
            <img src={product.images?.[0] || ''} className={classes.img} alt="product" />
          ) : (
            <div>No image</div>
          )}
        </div>
        <div className={classes.descriptionContainer} onClick={onClickViewProduct}>
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
      </div>
      <div className={classes.priceContainer}>
        <div className={classes.priceRow}>{formatPrice(product?.price)}</div>
        <div className={classes.priceRowLow}>{'руб.шт'}</div>
      </div>
      <div className={classes.amountColumn}>
        <AmountInput amount={amount} onChangeAmount={onChangeAmount} />
        <div className={classes.amountInfo}>
          <div className={classes.amountInfoWeight}>{weight && `${toStrWithDelimiter(weight.toFixed(1))} кг.`}</div>
          <div className={classes.amountInfoSquare}>{square && `${square.toFixed(2)} м.кв.`}</div>
          <div className={classes.amountInfoVolume}>{volume && `${volume.toFixed(2)} м.куб.`}</div>
        </div>
      </div>
      <div className={classes.summColumn}>
        {`${formatPrice(summ ? summ : 0)}`} <span>{' руб.'}</span>
      </div>
      <div className={classes.actionsColumn}>
        <div className={classes.actionContainer} onClick={onClickDeleteFromBasket}>
          <img src={deleteIco} className={classes.deleteIco} alt="view" />
        </div>
      </div>
    </div>
  );
};

export default OrderToManufacturerItem;
