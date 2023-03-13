import React from 'react';
import classes from './OrderStatus.module.css';
import { OrderStatusEnum, OrderType } from '../../../types/types';
import classNames from 'classnames';

type PropsType = {
  order: OrderType;
  isOrderForManufacturer: boolean;
};

export const getOrderStatusEnumValue = (status: OrderStatusEnum) => {
  return Object.entries(OrderStatusEnum).find(([key]) => key === status)?.[1] ?? '';
};

const OrderStatus: React.FC<PropsType> = ({ order, isOrderForManufacturer }) => {
  const status = order.order.status;

  let statusValue: OrderStatusEnum | '' = OrderStatusEnum.inArchive;
  let inArchive = true;
  let isOnConfirming = false;
  let isConfirmedOrder = false;
  let isCanceledByUser = false;
  let isCanceledByManufacturer = false;

  if (
    (isOrderForManufacturer && !order.order.inArchiveForManufacturer) ||
    (!isOrderForManufacturer && !order.order.inArchiveForUser)
  ) {
    statusValue = getOrderStatusEnumValue(status);
    isOnConfirming = getOrderStatusEnumValue(status) === OrderStatusEnum.onConfirming;
    isConfirmedOrder = getOrderStatusEnumValue(status) === OrderStatusEnum.confirmedOrder;
    isCanceledByUser = getOrderStatusEnumValue(status) === OrderStatusEnum.canceledByUser;
    isCanceledByManufacturer = getOrderStatusEnumValue(status) === OrderStatusEnum.canceledByManufacturer;
    inArchive = false;
  }

  return (
    <div
      className={classNames(classes.container, {
        [classes.onConfirming]: isOnConfirming,
        [classes.confirmedOrder]: isConfirmedOrder,
        [classes.canceledByUser]: isCanceledByUser,
        [classes.canceledByManufacturer]: isCanceledByManufacturer,
        [classes.inArchive]: inArchive,
      })}
    >
      <div className={classes.title}>{statusValue}</div>
    </div>
  );
};

export default OrderStatus;
