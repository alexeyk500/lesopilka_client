import React from 'react';
import classes from './UserOrdersPageMain.module.css';
import UserOrdersList from './UserOrdersList/UserOrdersList';

const UserOrdersPageMain: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>{'Список заказов поставщикам'}</div>
      <UserOrdersList />
    </div>
  );
};

export default UserOrdersPageMain;
