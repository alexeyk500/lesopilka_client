import React from 'react';
import classes from './OrderStatus.module.css';
import { OrderStatusEnum } from '../../../../../../types/types';
import selectorArrowIco from '../../../../../../img/selectorArrow.svg';
import classNames from 'classnames';

type PropsType = {
  status: OrderStatusEnum;
};

const getOrderStatusEnumValue = (status: OrderStatusEnum) => {
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
  const isCompleted = getOrderStatusEnumValue(status) === OrderStatusEnum.completed;
  const isAssembling = getOrderStatusEnumValue(status) === OrderStatusEnum.onAssembling;
  const isConfirming = getOrderStatusEnumValue(status) === OrderStatusEnum.onConfirming;
  const isDelivering = getOrderStatusEnumValue(status) === OrderStatusEnum.onDelivering;

  return (
    <div
      className={classNames(classes.container, {
        [classes.completed]: isCompleted,
        [classes.assembling]: isAssembling,
        [classes.confirming]: isConfirming,
        [classes.delivering]: isDelivering,
      })}
    >
      <div className={classes.title}>{statusValue}</div>
      {isShowArrowSelector && <img src={selectorArrowIco} className={classes.selectorArrowIco} alt="arrow" />}
    </div>
  );
};

export default OrderStatus;
