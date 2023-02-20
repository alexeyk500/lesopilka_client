import React from 'react';
import classes from './UserOrdersPageMain.module.css';
import OrdersList from './OrdersList/OrdersList';

const UserOrdersPageMain: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>{'Оформленные заказы'}</div>
      <OrdersList />
    </div>
  );
};

export default UserOrdersPageMain;
