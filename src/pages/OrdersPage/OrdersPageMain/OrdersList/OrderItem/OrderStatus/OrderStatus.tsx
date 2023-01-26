import React from 'react';
import classes from './OrderStatus.module.css';
import { OrderStatusEnum } from '../../../../../../types/types';
import selectorArrowIco from '../../../../../../img/selectorArrow.svg';
import classNames from 'classnames';
import { showPortalPopUp } from '../../../../../../components/PortalPopUp/PortalPopUp';

type PropsType = {
  status: OrderStatusEnum;
};

export const getOrderStatusEnumValue = (status: OrderStatusEnum) => {
  return Object.entries(OrderStatusEnum).find(([key]) => key === status)?.[1] ?? '';
};

const showArrowSelector = (status: OrderStatusEnum) => {
  if (getOrderStatusEnumValue(status) === OrderStatusEnum.onConfirming) {
    return false;
  } else if (getOrderStatusEnumValue(status) === OrderStatusEnum.onAssembling) {
    return false;
  } else if (getOrderStatusEnumValue(status) === OrderStatusEnum.completed) {
    return false;
  }
  return true;
};

const OrderStatus: React.FC<PropsType> = ({ status }) => {
  const statusValue = getOrderStatusEnumValue(status);

  const isShowArrowSelector = showArrowSelector(status);
  const isConfirming = getOrderStatusEnumValue(status) === OrderStatusEnum.onConfirming;
  const isPaymentWaiting = getOrderStatusEnumValue(status) === OrderStatusEnum.onPaymentWaiting;
  const isAssembling = getOrderStatusEnumValue(status) === OrderStatusEnum.onAssembling;
  const isDelivering = getOrderStatusEnumValue(status) === OrderStatusEnum.onDelivering;
  const isCompleted = getOrderStatusEnumValue(status) === OrderStatusEnum.completed;

  const onClick = () => {
    if (isDelivering) {
      showPortalPopUp({
        popUpContent: <div className={classes.infoPopUpText}>{'\n\nПодтвердить получение заказа?\n\n\n\n'}</div>,
        titleConfirmBtn: 'Я получил',
        customClassBottomBtnGroup: classes.customPopUpBottomBtnGroup,
        onClosePopUp: (result?: boolean | FormData | undefined) => {
          if (result) {
            console.log('set status Completed');
          }
        },
      });
    } else if (isPaymentWaiting) {
      showPortalPopUp({
        popUpContent: <div className={classes.infoPopUpText}>{'\n\nПодтвердить поставщику оплату счета?\n\n\n\n'}</div>,
        titleConfirmBtn: 'Я оплатил',
        customClassBottomBtnGroup: classes.customPopUpBottomBtnGroup,
        onClosePopUp: (result?: boolean | FormData | undefined) => {
          if (result) {
            console.log('set status onAssembling');
          }
        },
      });
    }
  };

  return (
    <div
      className={classNames(classes.container, {
        [classes.completed]: isCompleted,
        [classes.assembling]: isAssembling,
        [classes.confirming]: isConfirming,
        [classes.delivering]: isDelivering,
      })}
      onClick={onClick}
    >
      <div className={classes.title}>{statusValue}</div>
      {isShowArrowSelector && <img src={selectorArrowIco} className={classes.selectorArrowIco} alt="arrow" />}
    </div>
  );
};

export default OrderStatus;
