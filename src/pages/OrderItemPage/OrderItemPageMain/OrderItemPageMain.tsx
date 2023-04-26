import React from 'react';
import classes from '../../UserOrdersPage/UserOrdersPageMain/UserOrdersPageMain.module.css';
import OrderItem from '../../../components/OrderItem/OrderItem';
import OrderItemTableTile from '../../../components/commonComponents/OrderItemTableTile/OrderItemTableTile';
import { OrderType } from '../../../types/types';

type PropsType = {
  order?: OrderType;
  updateOrderItem: () => void;
  isManufacturerOrder?: boolean;
};

const OrderItemPageMain: React.FC<PropsType> = ({ order, updateOrderItem, isManufacturerOrder }) => {
  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>{isManufacturerOrder ? 'Заказ от покупателя' : 'Заказ поставщику'}</div>
      <div className={classes.orderContainer}>
        <OrderItemTableTile />
        {order && (
          <div className={classes.scrollContainer}>
            <OrderItem
              key={order?.order?.id}
              order={order}
              updateOrders={updateOrderItem}
              isManufacturer={isManufacturerOrder}
              openDetails
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItemPageMain;
