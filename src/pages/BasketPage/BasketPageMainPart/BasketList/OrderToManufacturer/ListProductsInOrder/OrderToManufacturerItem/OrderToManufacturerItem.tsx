import React, { useState } from 'react';
import classes from './OrderToManufacturerItem.module.css';
import { DriedEnum, OrderType, ProductType, SepticEnum } from '../../../../../../../types/types';
import {
  formatPrice,
  getLogisticInfo,
  getProductSizesStr,
  onCloseDetailCard,
  toStrWithDelimiter,
} from '../../../../../../../utils/functions';
import AmountInput from '../../../../../../../components/AmountInput/AmountInput';
import deleteIco from '../../../../../../../img/deleteBlueIco.svg';
import deleteRedIco from '../../../../../../../img/deleteRedIco.svg';
import { updateBasketProductAmountThunk } from '../../../../../../../store/basketSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks/hooks';
import { showPopUpDeleteProductFromBasket } from '../../../../../../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { getProductThunk, selectorBasketProducts } from '../../../../../../../store/productSlice';
import { isFulfilled } from '@reduxjs/toolkit';
import {
  CloseDetailCardType,
  showDetailProductCardPopUp,
} from '../../../../../../../components/DetailProductCard/DetailProductCard';
import useDebouncedFunction from '../../../../../../../hooks/useDebounceFunction';
import { DEBOUNCE_TIME, MAX_BASKET_PRODUCT_AMOUNT } from '../../../../../../../utils/constants';
import classNames from 'classnames';
import AttentionSign from './AttentionSign/AttentionSign';
import { checkIsDivergenceByProductId } from '../../../../../../../utils/ordersFunctions';

type PropsType = {
  num: number;
  product: ProductType;
  onlyView?: boolean;
  isConfirmation?: boolean;
  isDivergence?: boolean;
  order?: OrderType;
};

interface IGetAmount {
  product: ProductType;
  onlyView?: boolean;
  isConfirmation?: boolean;
  isDivergence?: boolean;
  productDivergenceAmount?: number | boolean;
}

const getAmount = ({ product, onlyView, isConfirmation, isDivergence, productDivergenceAmount }: IGetAmount) => {
  if (onlyView) {
    return product.amountInOrder ? product.amountInOrder : 0;
  } else if (isConfirmation) {
    return product.amountInConfirmation ? product.amountInConfirmation : 0;
  } else if (isDivergence) {
    return typeof productDivergenceAmount === 'number' ? productDivergenceAmount : 0;
  } else if (product.amountInBasket) {
    return product.amountInBasket ? product.amountInBasket : 0;
  }
  return 0;
};

const OrderToManufacturerItem: React.FC<PropsType> = ({
  num,
  product,
  onlyView,
  isConfirmation,
  isDivergence,
  order,
}) => {
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector(selectorBasketProducts);

  const productSizes = getProductSizesStr(product);

  const productDivergenceAmount = checkIsDivergenceByProductId(product.confirmedProductId, order);

  const [amount, setAmount] = useState(
    getAmount({ product, onlyView, isConfirmation, isDivergence, productDivergenceAmount })
  );

  const { square, weight, volume, cost } = getLogisticInfo(product, amount);

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

  const onClickDeleteFromBasket = () => {
    if (product) {
      showPopUpDeleteProductFromBasket(product, dispatch);
    }
  };

  const onCloseDetailCardHandler = (result: CloseDetailCardType) => {
    onCloseDetailCard(result, dispatch, basketProducts);
  };

  const onClickViewProduct = () => {
    let productId;
    if (isConfirmation) {
      productId = product.confirmedProductId;
    } else {
      productId = product.id;
    }
    if (productId) {
      dispatch(getProductThunk(productId)).then((result) => {
        if (isFulfilled(result)) {
          showDetailProductCardPopUp(result.payload, basketProducts, onCloseDetailCardHandler);
        }
      });
    }
  };

  const isShowDeleteFromBasket = onlyView ? false : isConfirmation ? false : isDivergence ? false : true;

  if (isDivergence && !productDivergenceAmount) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.numTitle}>{num}</div>
      <div className={classNames(classes.viewContainer, { [classes.grayText]: !product.publicationDate })}>
        <div className={classes.imageContainer} onClick={onClickViewProduct}>
          {product.images?.[0] ? (
            <img src={product.images?.[0] || ''} className={classes.img} alt="product" />
          ) : (
            <div>No image</div>
          )}
        </div>
        <div
          className={classNames(classes.descriptionContainer, { [classes.grayText]: !product.publicationDate })}
          onClick={onClickViewProduct}
        >
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
        {product.publicationDate && (
          <>
            <div className={classes.priceRow}>{formatPrice(product?.price)}</div>
            <div className={classes.priceRowLow}>{'руб.шт.'}</div>
          </>
        )}
      </div>
      <div className={classes.amountColumn}>
        {product.publicationDate ? (
          <>
            {onlyView || isConfirmation || isDivergence ? (
              <div className={classes.amountRow}>{`${amount} шт.`}</div>
            ) : (
              <AmountInput amount={amount} onChangeAmount={onChangeAmount} />
            )}
            {amount > 0 && (
              <div className={classes.amountInfo}>
                <div className={classes.amountInfoWeight}>
                  {weight && `${toStrWithDelimiter(weight.toFixed(1))} кг.`}
                </div>
                <div className={classes.amountInfoSquare}>{square && `${square.toFixed(2)} м.кв.`}</div>
                <div className={classes.amountInfoVolume}>{volume && `${volume.toFixed(2)} м.куб.`}</div>
              </div>
            )}
          </>
        ) : (
          <div className={classes.unavailableInfo}>
            <div className={classes.unavailableRow}>Временно</div>
            <div className={classes.unavailableRow}>недоступен</div>
          </div>
        )}
      </div>
      <div className={classes.costColumn}>
        {product.publicationDate && (
          <>
            {`${formatPrice(cost ? cost : 0)}`} <span>{' руб.'}</span>
          </>
        )}
      </div>
      {isShowDeleteFromBasket && (
        <div className={classes.actionsColumn}>
          <div className={classes.actionContainer} onClick={onClickDeleteFromBasket}>
            <img src={product.publicationDate ? deleteIco : deleteRedIco} className={classes.deleteIco} alt="view" />
          </div>
        </div>
      )}
      {
        <AttentionSign
          order={order}
          productId={
            isConfirmation ? product.confirmedProductId : isDivergence ? product.confirmedProductId : product.id
          }
          onlyView={onlyView}
          isConfirmation={isConfirmation}
          isDivergence={isDivergence}
        />
      }
    </div>
  );
};

export default OrderToManufacturerItem;
