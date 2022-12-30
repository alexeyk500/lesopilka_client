import React from 'react';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import classes from './PaymentMethodSection.module.css';
import CheckBoxBlueSquare from '../../../../components/commonComponents/CheckBoxBlueSquare/CheckBoxBlueSquare';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  selectorNewOrderDeliveryMethod,
  selectorNewOrderPaymentMethod,
  setPaymentMethod,
} from '../../../../store/newOrderSlice';
import { DeliveryMethodEnum, PaymentMethodEnum } from '../../../../types/types';
import { DELIVERY_PAYMENT_METHODS, PICKUP_PAYMENT_METHODS } from '../../../../utils/constants';

export const checkPaymentMethodSection = (paymentMethod: PaymentMethodEnum) => {
  return !!paymentMethod;
};

const PaymentMethodSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const paymentMethod = useAppSelector(selectorNewOrderPaymentMethod);
  const deliveryMethod = useAppSelector(selectorNewOrderDeliveryMethod);
  const isSectionCondition = checkPaymentMethodSection(paymentMethod);

  const paymentOptions =
    deliveryMethod === DeliveryMethodEnum.delivery ? DELIVERY_PAYMENT_METHODS : PICKUP_PAYMENT_METHODS;

  const onSelectPaymentMethod = (id: number | string) => {
    dispatch(setPaymentMethod(id as PaymentMethodEnum));
  };

  return (
    <SectionContainer title={'Способ оплаты'} completeCondition={isSectionCondition}>
      {paymentOptions.map((paymentOption) => (
        <div key={paymentOption} className={classes.checkBoxContainer}>
          <CheckBoxBlueSquare
            id={paymentOption}
            title={paymentOption}
            checked={paymentMethod === paymentOption}
            onSelect={onSelectPaymentMethod}
          />
        </div>
      ))}
    </SectionContainer>
  );
};

export default PaymentMethodSection;
