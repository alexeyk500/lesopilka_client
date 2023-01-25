import React from 'react';
import classes from './OrdersPageMain.module.css';
import OrdersList from './OrdersList/OrdersList';

const OrdersPageMain: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>{'Оформленные заказы'}</div>
      <OrdersList />
    </div>
  );
};

export default OrdersPageMain;
