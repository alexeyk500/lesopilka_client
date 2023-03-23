import React from 'react';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import OrderInfoCard from '../../../components/OrderInfoCard/OrderInfoCard';
import { AmountTypeEnum, OrderType } from '../../../types/types';
import { getTotalLogisticInfo } from '../../../utils/functions';
import classes from './OrderItemPageControl.module.css';

type PropsType = {
  order?: OrderType;
  isManufacturerOrder?: boolean;
};

const OrderItemPageControl: React.FC<PropsType> = ({ order, isManufacturerOrder }) => {
  const { totalWeight, totalVolume, totalCost } = getTotalLogisticInfo(order?.products, AmountTypeEnum.inOrder);

  return (
    <div className={classes.container}>
      {order && (
        <OrderInfoCard
          date={order.order.deliveryDate}
          contactPersonName={order.order.contactPersonName}
          contactPersonPhone={order.order.contactPersonPhone}
          manufacturer={order.products?.[0].manufacturer}
          totalWeight={totalWeight}
          totalVolume={totalVolume}
          totalCost={totalCost}
        />
      )}

      {isManufacturerOrder ? (
        <BottomButtonReturnTo returnTo={ReturnToEnum.manufacturerOrders} />
      ) : (
        <BottomButtonReturnTo returnTo={ReturnToEnum.userOrders} />
      )}
    </div>
  );
};

export default OrderItemPageControl;
