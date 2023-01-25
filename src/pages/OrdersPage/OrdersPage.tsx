import React from 'react';
import classes from '../NewOrderPage/NewOrderPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';
import OrdersPageControl from './OrdersPageControl/OrdersPageControl';
import OrdersPageMain from './OrdersPageMain/OrdersPageMain';

const OrdersPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={`Заказы`}>
        <OrdersPageControl />
      </LeftColumn>
      <MainColumn noScroll>
        <OrdersPageMain />
      </MainColumn>
    </div>
  );
};

export default OrdersPage;
