import React from 'react';
import classes from './ManOrdersPageMain.module.css';
import ManOrdersList from './ManOrdersList/ManOrdersList';

const ManOrdersPageMain = () => {
  return (
    <div className={classes.container}>
      <ManOrdersList />
    </div>
  );
};

export default ManOrdersPageMain;
