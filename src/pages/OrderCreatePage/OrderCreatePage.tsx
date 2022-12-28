import React from 'react';
import classes from './OrderCreatePage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';
import OrderCreatePageControl from './OrderCreatePageControl/OrderCreatePageControl';
import OrderCreateMainPart from './OrderCreateMainPart/OrderCreateMainPart';

const OrderCreatePage = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Оформление заказа`}>
        <OrderCreatePageControl />
      </LeftColumn>
      <MainColumn>
        <OrderCreateMainPart />
      </MainColumn>
    </div>
  );
};

export default OrderCreatePage;
