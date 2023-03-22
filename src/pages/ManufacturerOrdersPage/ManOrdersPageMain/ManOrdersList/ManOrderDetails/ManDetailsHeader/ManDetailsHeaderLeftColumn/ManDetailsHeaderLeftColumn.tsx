import React from 'react';
import classes from './ManDetailsHeaderLeftColumn.module.css';
import { getDeliveryTitle, getOrderDetailHeader } from '../../../../../../../utils/ordersFunctions';
import { formatUTCtoDDMMMMYYYY } from '../../../../../../../utils/dateTimeFunctions';
import { getPaymentMethodTitle } from '../../../../../../NewOrderPage/NewOrderPageMainPart/PaymentMethodSection/PaymentMethodSection';
import { AmountTypeEnum, DeliveryMethodEnum, OrderType } from '../../../../../../../types/types';

type PropsType = {
  order: OrderType;
  infoTab: AmountTypeEnum;
  freeDelivery: boolean;
  confirmedDeliveryPrice: number | null;
};

const ManDetailsHeaderLeftColumn: React.FC<PropsType> = ({ order, infoTab, freeDelivery, confirmedDeliveryPrice }) => {
  const deliveryDate = formatUTCtoDDMMMMYYYY(order.order.deliveryDate);
  const deliveryTitle = getDeliveryTitle(
    order.order.deliveryMethod.title,
    freeDelivery ? 0 : confirmedDeliveryPrice,
    true
  );
  const paymentMethodTitle = getPaymentMethodTitle(
    order.order.deliveryMethod.title as DeliveryMethodEnum,
    order.order.paymentMethod.title
  );
  const contactPersonName = order.order.contactPersonName;
  const contactPersonPhone = order.order.contactPersonPhone;

  const orderDetailsHeader = getOrderDetailHeader({
    orderId: order.order.id,
    date: deliveryDate,
    infoTab,
  });

  return (
    <div className={classes.container}>
      <div className={classes.titleRow}>{orderDetailsHeader}</div>
      <div className={classes.row}>
        <div className={classes.title}>{'Покупатель:'}</div>
        <div className={classes.info}>
          {`${order.order.userInfo?.name},`}
          &nbsp;&nbsp;
          {`${order.order.userInfo?.email}`}
        </div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>{'Дата поставки:'}</div>
        <div className={classes.info}>{`${deliveryDate}`}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>{'Способ поставки:'}</div>
        <div className={classes.info}>{`${deliveryTitle}`}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>{'Способ оплаты:'}</div>
        <div className={classes.info}>{`${paymentMethodTitle}`}</div>
      </div>
      <div className={classes.row}>
        <div className={classes.title}>{'Контактное лицо:'}</div>
        <div className={classes.info}>
          {`${contactPersonPhone},`}
          &nbsp;&nbsp;
          {`${contactPersonName}`}
        </div>
      </div>
    </div>
  );
};

export default ManDetailsHeaderLeftColumn;
