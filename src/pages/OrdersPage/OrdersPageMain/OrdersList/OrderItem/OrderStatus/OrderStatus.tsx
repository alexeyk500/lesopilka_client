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
  const partedTitle = statusValue.split('|');

  const isOnConfirming = getOrderStatusEnumValue(status) === OrderStatusEnum.onConfirming;
  const isConfirmedOrder = getOrderStatusEnumValue(status) === OrderStatusEnum.confirmedOrder;
  const isCanceledByUser = getOrderStatusEnumValue(status) === OrderStatusEnum.canceledByUser;
  const isCanceledByManufacturer = getOrderStatusEnumValue(status) === OrderStatusEnum.canceledByManufacturer;
  const inArchive = getOrderStatusEnumValue(status) === OrderStatusEnum.inArchive;

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
      <div className={classes.title}>
        {partedTitle[0]}
        {partedTitle[1] && <div className={classes.secondLine}>{partedTitle[1]}</div>}
      </div>
    </div>
  );
};

export default OrderStatus;
