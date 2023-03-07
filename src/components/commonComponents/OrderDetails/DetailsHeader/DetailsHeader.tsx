import React from 'react';
import classes from '../OrderDetails.module.css';
import { DeliveryMethodEnum, AmountTypeEnum, OrderType } from '../../../../types/types';
import { getDeliveryTitle, getOrderDetailHeader } from '../../../../utils/ordersFunctions';
import { formatUTCtoDDMMMMYYYY } from '../../../../utils/dateTimeFunctions';
import { getPaymentMethodTitle } from '../../../../pages/NewOrderPage/NewOrderPageMainPart/PaymentMethodSection/PaymentMethodSection';

type PropsType = {
  order: OrderType;
  infoTab: AmountTypeEnum;
};

const DetailsHeader: React.FC<PropsType> = ({ order, infoTab }) => {
  const manufacturerTitle = order.products[0].manufacturer?.title ?? '';
  const manufacturerLocationTitle = order.products[0].manufacturer?.address.location.title ?? '';
  const manufacturerPhone = order.products[0].manufacturer?.phone ?? '';
  const manufacturerEmail = order.products[0].manufacturer?.email ?? '';

  const deliveryDate = formatUTCtoDDMMMMYYYY(order.order.deliveryDate);
  const deliveryTitle = getDeliveryTitle(order.order.deliveryMethod.title, order.order.deliveryPrice, true);
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
    <div className={classes.detailsHeader}>
      <div className={classes.titleRow}>{orderDetailsHeader}</div>
      <div className={classes.row}>
        <div className={classes.title}>{'Поставщик:'}</div>
        <div className={classes.info}>
          {`${manufacturerTitle},`}
          &nbsp;&nbsp;
          {`${manufacturerLocationTitle},`}
          &nbsp;&nbsp;
          {`${manufacturerPhone},`}
          &nbsp;&nbsp;
          {`${manufacturerEmail}`}
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
          {`${contactPersonName},`}
          &nbsp;&nbsp;
          {`${contactPersonPhone},`}
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
