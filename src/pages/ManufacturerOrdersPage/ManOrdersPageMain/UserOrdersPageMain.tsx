import React from 'react';
import classes from './UserOrdersPageMain.module.css';
import ManOrdersList from './ManOrdersList/ManOrdersList';

const UserOrdersPageMain = () => {
  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>{'Список заказов от покупателей'}</div>
      <ManOrdersList />
    </div>
  );
};

export default UserOrdersPageMain;
