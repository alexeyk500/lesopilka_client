import React from 'react';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import classes from './PaymentMethodSection.module.css';
import CheckBoxBlueSquare from '../../../../components/commonComponents/CheckBoxBlueSquare/CheckBoxBlueSquare';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  selectorNewOrderDeliveryMethod,
  selectorNewOrderPaymentMethod,
  selectorNewOrderPaymentMethods,
  setPaymentMethod,
} from '../../../../store/newOrderSlice';
import { DeliveryMethodEnum, PaymentMethodEnum } from '../../../../types/types';

export const checkPaymentMethodSection = (paymentMethod: PaymentMethodEnum) => {
  return !!paymentMethod;
};

export const getPaymentMethodTitle = (deliveryMethod: DeliveryMethodEnum, paymentOption: string) => {
  if (
    (paymentOption as PaymentMethodEnum) === PaymentMethodEnum.card ||
    (paymentOption as PaymentMethodEnum) === PaymentMethodEnum.cash
  ) {
    if (deliveryMethod === DeliveryMethodEnum.delivery) {
      return `${paymentOption} при доставке `;
    }
    return `${paymentOption} при самовывозе `;
  }
  return paymentOption;
};

const PaymentMethodSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const paymentMethod = useAppSelector(selectorNewOrderPaymentMethod);
  const paymentMethods = useAppSelector(selectorNewOrderPaymentMethods);
  const deliveryMethod = useAppSelector(selectorNewOrderDeliveryMethod);
  const isSectionCondition = checkPaymentMethodSection(paymentMethod);

  const paymentOptions = paymentMethods.map((paymentMethodItem) => paymentMethodItem.title);

  const onSelectPaymentMethod = (id: number | string) => {
    dispatch(setPaymentMethod(id as PaymentMethodEnum));
  };

  return (
    <SectionContainer title={'Способ оплаты'} completeCondition={isSectionCondition}>
      {paymentOptions.map((paymentOption) => (
        <div key={paymentOption} className={classes.checkBoxContainer}>
          <CheckBoxBlueSquare
            id={paymentOption}
            title={getPaymentMethodTitle(deliveryMethod, paymentOption)}
            checked={paymentMethod === paymentOption}
            onSelect={onSelectPaymentMethod}
            dataTestId={paymentOption}
          />
        </div>
      ))}
    </SectionContainer>
  );
};

export default PaymentMethodSection;
