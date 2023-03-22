import React from 'react';
import classes from '../NewOrderPage/NewOrderPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';
import OrderItemPageControl from './OrderItemPageControl/OrderItemPageControl';
import OrderItemPageMain from './OrderItemPageMain/OrderItemPageMain';

type PropsType = {
  isManufacturerOrder?: boolean;
};

const OrderItemPage: React.FC<PropsType> = ({ isManufacturerOrder }) => {
  return (
    <div className={classes.container}>
      <LeftColumn title={isManufacturerOrder ? 'Заказ от покупателя' : 'Заказ поставщику'}>
        <OrderItemPageControl isManufacturerOrder={isManufacturerOrder} />
      </LeftColumn>
      <MainColumn noScroll>
        <OrderItemPageMain isManufacturerOrder={isManufacturerOrder} />
      </MainColumn>
    </div>
  );
};

export default OrderItemPage;
