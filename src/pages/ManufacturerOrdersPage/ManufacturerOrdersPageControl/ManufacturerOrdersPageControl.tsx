import React from 'react';
import classes from './ManufacturerOrdersPageControl.module.css';
import OrderStatusSelector from '../../OrdersPage/OrdersPageControl/OrderStatusSelector/OrderStatusSelector';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';

const ManufacturerOrdersPageControl = () => {
  return (
    <>
      <div className={classes.containerSection}>DateIntervalSelector</div>
      <div className={classes.containerSection}>
        <OrderStatusSelector />
      </div>
      <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
    </>
  );
};

export default ManufacturerOrdersPageControl;
