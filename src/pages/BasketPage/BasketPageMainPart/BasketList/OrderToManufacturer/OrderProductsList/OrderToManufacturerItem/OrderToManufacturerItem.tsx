import React, { useEffect, useState } from 'react';
import classes from './OrderToManufacturerItem.module.css';
import { AmountTypeEnum, DriedEnum, ProductType, SepticEnum } from '../../../../../../../types/types';
import {
  formatPrice,
  getLogisticInfo,
  getProductSizesStr,
  toStrWithDelimiter,
} from '../../../../../../../utils/functions';
import AmountInput from '../../../../../../../components/AmountInput/AmountInput';
import deleteIco from '../../../../../../../img/deleteBlueIco.svg';
import deleteRedIco from '../../../../../../../img/deleteRedIco.svg';
import { updateBasketProductAmountThunk } from '../../../../../../../store/basketSlice';
import { useAppDispatch } from '../../../../../../../hooks/hooks';
import { showPopUpDeleteProductFromBasket } from '../../../../../../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import useDebouncedFunction from '../../../../../../../hooks/useDebounceFunction';
import { DEBOUNCE_TIME, MAX_BASKET_PRODUCT_AMOUNT } from '../../../../../../../utils/constants';
import classNames from 'classnames';
import AttentionSign from './AttentionSign/AttentionSign';
import { getProductAmountByAmountType } from '../../../../../../../utils/ordersFunctions';
import useShowDetailProductCardPopUp from '../../../../../../../hooks/useShowDetailProductCardPopUp';

type PropsType = {
  num: number;
  product: ProductType;
  amountType: AmountTypeEnum;
  updateProductConfirmationAmount?: (product: ProductType, newAmount: number) => void;
  showAmountInput?: boolean;
};

const OrderToManufacturerItem: React.FC<PropsType> = ({
  num,
  product,
  amountType,
  updateProductConfirmationAmount,
  showAmountInput,
}) => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(getProductAmountByAmountType(product, amountType));

  const showDetailProductCardPopUp = useShowDetailProductCardPopUp(product);

  useEffect(() => {
    setAmount(getProductAmountByAmountType(product, amountType));
  }, [product, amountType]);

  const productSizes = getProductSizesStr(product);
  const { square, weight, volume, cost } = getLogisticInfo(product, amount);

  const onChangeAmount = (newValue: number | string) => {
    if (amountType === AmountTypeEnum.inBasket) {
      onChangeAmountInBasket(newValue);
    } else if (amountType === AmountTypeEnum.inConfirmation) {
      onChangeAmountInConfirmation(newValue);
    }
  };

  const onChangeAmountInBasket = (newValue: number | string) => {
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

  const onChangeAmountInConfirmation = (newValue: number | string) => {
    if (typeof newValue === 'number') {
      if (newValue > 0 && newValue <= MAX_BASKET_PRODUCT_AMOUNT && updateProductConfirmationAmount) {
        updateProductConfirmationAmount(product, newValue);
      }
    } else {
      const numberNewValue = Number(newValue);
      if (numberNewValue) {
        if (numberNewValue <= MAX_BASKET_PRODUCT_AMOUNT && updateProductConfirmationAmount) {
          updateProductConfirmationAmount(product, numberNewValue);
        }
      } else {
        updateProductConfirmationAmount && updateProductConfirmationAmount(product, numberNewValue);
      }
    }
  };

  const onClickDeleteFromBasket = () => {
    if (product) {
      showPopUpDeleteProductFromBasket(product, dispatch);
    }
  };

  const onClickViewProduct = () => {
    let productId;
    if (amountType === AmountTypeEnum.inConfirmation) {
      productId = product.confirmedProductId;
    } else {
      productId = product.id;
    }
    if (productId) {
      showDetailProductCardPopUp();
    }
  };

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
            {amountType === AmountTypeEnum.inBasket || showAmountInput ? (
              <AmountInput amount={amount} onChangeAmount={onChangeAmount} />
            ) : (
              <div className={classes.amountRow}>{`${amount} шт.`}</div>
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
      {amountType === AmountTypeEnum.inBasket && (
        <div className={classes.actionsColumn}>
          <div className={classes.actionContainer} onClick={onClickDeleteFromBasket}>
            <img
              src={product.publicationDate ? deleteIco : deleteRedIco}
              className={classes.deleteIco}
              data-test-id={'deleteFromOrder'}
              alt="delete"
            />
          </div>
        </div>
      )}
      {<AttentionSign product={product} amountType={amountType} />}
    </div>
  );
};

export default OrderToManufacturerItem;
