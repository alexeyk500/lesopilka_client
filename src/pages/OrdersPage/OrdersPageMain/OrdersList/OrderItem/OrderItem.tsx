import React from 'react';
import classes from './OrderItem.module.css';
import { OrderType } from '../../../../../types/types';

type PropsType = {
  order: OrderType;
};

const OrderItem: React.FC<PropsType> = ({ order }) => {
  return <div className={classes.container}>{order.order.date}</div>;
};

export default OrderItem;
