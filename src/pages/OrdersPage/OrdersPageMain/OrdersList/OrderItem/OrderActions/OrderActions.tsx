import React from 'react';
import classes from './OrderActions.module.css';
import viewIco from '../../../../../../img/eyeIco.svg';
import billIco from '../../../../../../img/billIco.svg';
import deleteIco from '../../../../../../img/deleteBlueIco.svg';

const OrderActions: React.FC = () => {
  return (
    <div className={classes.container}>
      <img src={viewIco} className={classes.viewIco} alt="view" />
      <img src={billIco} className={classes.billIco} alt="view" />
      <img src={deleteIco} className={classes.deleteIco} alt="view" />
    </div>
  );
};

export default OrderActions;
