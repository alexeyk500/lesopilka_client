import React from 'react';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';

type PropsType = {
  isManufacturerOrder?: boolean;
};

const OrderItemPageControl: React.FC<PropsType> = ({ isManufacturerOrder }) => {
  return (
    <>
      {isManufacturerOrder ? (
        <BottomButtonReturnTo returnTo={ReturnToEnum.manufacturerOrders} />
      ) : (
        <BottomButtonReturnTo returnTo={ReturnToEnum.userOrders} />
      )}
    </>
  );
};

export default OrderItemPageControl;
