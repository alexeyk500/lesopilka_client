import React from 'react';
import classes from './InfoAndErrorMessageForm.module.css';
import { PopupRef, showPortalPopUp } from '../PortalPopUp/PortalPopUp';
import classNames from 'classnames';
import { AppDispatch } from '../../store/store';
import { ProductType } from '../../types/types';
import { getProductSizesStr } from '../../utils/functions';
import { toggleProductForBasketThunk } from '../../store/basketSlice';

type PropsType = {
  message: string;
  isError?: boolean;
};

const InfoAndErrorMessageForm: React.FC<PropsType> = ({ message, isError }) => {
  return <div className={classNames(classes.container, { [classes.error]: isError })}>{message}</div>;
};

export const showErrorPopUp = (message: string, onConfirm?: (result?: boolean | FormData) => void) => {
  showPortalPopUp({
    popUpContent: <InfoAndErrorMessageForm message={message} isError />,
    oneCenterConfirmBtn: true,
    titleConfirmBtn: 'Понятно',
    onClosePopUp: onConfirm,
  });
};

export const showPreloaderPopUp = (message: string, ref: React.MutableRefObject<PopupRef | null>) => {
  showPortalPopUp({
    popUpContent: <InfoAndErrorMessageForm message={message} />,
    withoutButtons: true,
    ref: ref,
  });
};

export const showConfirmPopUp = (message: string, onConfirm?: (result?: boolean | FormData) => void) => {
  showPortalPopUp({
    popUpContent: <InfoAndErrorMessageForm message={message} />,
    titleConfirmBtn: 'Подтвердить',
    customClassBottomBtnGroup: classes.customClassBottomBtnGroup,
    onClosePopUp: onConfirm,
  });
};

export const showPopUpDeleteProductFromBasket = (
  product: ProductType,
  dispatch?: AppDispatch,
  forDetailCardActions?: () => void,
  setAllowToClose?: () => void
) => {
  const productSizes = getProductSizesStr(product);
  const onConfirmDelete = (result: boolean | FormData | undefined) => {
    if (dispatch) {
      if (result) {
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        if (product?.id && token) {
          dispatch(toggleProductForBasketThunk({ productId: product.id, token }));
        }
      }
    } else {
      if (forDetailCardActions && setAllowToClose) {
        if (result) {
          forDetailCardActions();
        }
        setAllowToClose();
      }
    }
  };
  showPortalPopUp({
    popUpContent: (
      <InfoAndErrorMessageForm message={`${product?.subCategory?.title}\n${productSizes}\n\nбудет удален из корзины`} />
    ),
    titleConfirmBtn: 'Подтвердить',
    customClassBottomBtnGroup: classes.customClassBottomBtnGroup,
    onClosePopUp: onConfirmDelete,
  });
};
