import React from 'react';
import cashMachineGrayIco from '../../../img/cashMachineGrayIco.svg';
import classes from '../../../pages/NewOrderPage/NewOrderPageControl/NewOrderInfo/NewOrderInfo.module.css';
import OrderInfoSection from '../OrderInfoSection/OrderInfoSection';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorNewOrderPaymentMethod } from '../../../store/newOrderSlice';

const PaymentMethodInfo: React.FC = () => {
  const paymentMethod = useAppSelector(selectorNewOrderPaymentMethod);

  return (
    <OrderInfoSection
      ico={cashMachineGrayIco}
      title={'Способ оплаты:'}
      infoFirstLine={paymentMethod}
      customIcoClasses={classes.downIco}
    />
  );
};

export default PaymentMethodInfo;
