import React from 'react';
import classes from './OrderStatus.module.css';
import { OrderStatusEnum } from '../../../../../../types/types';
import classNames from 'classnames';

type PropsType = {
  status: OrderStatusEnum;
};

export const getOrderStatusEnumValue = (status: OrderStatusEnum) => {
  return Object.entries(OrderStatusEnum).find(([key]) => key === status)?.[1] ?? '';
};

const OrderStatus: React.FC<PropsType> = ({ status }) => {
  const statusValue = getOrderStatusEnumValue(status);

  const isOnConfirming = getOrderStatusEnumValue(status) === OrderStatusEnum.onConfirming;
  const isConfirmedOrder = getOrderStatusEnumValue(status) === OrderStatusEnum.confirmedOrder;
  const isCanceledByUser = getOrderStatusEnumValue(status) === OrderStatusEnum.canceledByUser;
  const isCanceledByManufacturer = getOrderStatusEnumValue(status) === OrderStatusEnum.canceledByManufacturer;
  const isClosedByDate = getOrderStatusEnumValue(status) === OrderStatusEnum.closedByDate;

  return (
    <div
      className={classNames(classes.container, {
        [classes.onConfirming]: isOnConfirming,
        [classes.confirmedOrder]: isConfirmedOrder,
        [classes.canceledByUser]: isCanceledByUser,
        [classes.canceledByManufacturer]: isCanceledByManufacturer,
        [classes.closedByDate]: isClosedByDate,
      })}
    >
      <div className={classes.title}>{statusValue}</div>
    </div>
  );
};

export default OrderStatus;
