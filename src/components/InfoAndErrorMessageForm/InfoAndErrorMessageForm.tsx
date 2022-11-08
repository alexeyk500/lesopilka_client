import React from 'react';
import classes from './InfoAndErrorMessageForm.module.css';
import { PopupRef, showPortalPopUp } from '../PortalPopUp/PortalPopUp';
import classNames from 'classnames';

type PropsType = {
  message: string;
  isError?: boolean;
};

const InfoAndErrorMessageForm: React.FC<PropsType> = ({ message, isError }) => {
  return <div className={classNames(classes.container, { [classes.error]: isError })}>{message}</div>;
};

export const showErrorPopUp = (message: string) => {
  showPortalPopUp({
    popUpContent: <InfoAndErrorMessageForm message={message} isError />,
    oneCenterConfirmBtn: true,
    titleConfirmBtn: 'Понятно',
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
