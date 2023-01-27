import React from 'react';
import classes from './OrderDetails.module.css';
import { DeliveryMethodEnum, OrderType } from '../../../../../../types/types';
import { formatUTCtoDDMMMMYYYY } from '../../../../../../utils/dateTimeFunctions';
import { getPaymentMethodTitle } from '../../../../../NewOrderPage/NewOrderPageMainPart/PaymentMethodSection/PaymentMethodSection';

type PropsType = {
  order: OrderType;
};

const OrderDetails: React.FC<PropsType> = ({ order }) => {
  const manufacturerTitle = order.products[0].manufacturer?.title ?? '';
  const manufacturerLocationTitle = order.products[0].manufacturer?.address.location.title ?? '';
  const manufacturerPhone = order.products[0].manufacturer?.phone ?? '';
  const manufacturerEmail = order.products[0].manufacturer?.email ?? '';

  const deliveryDate = formatUTCtoDDMMMMYYYY(order.order.date);
  const deliveryMethodTile = order.order.deliveryMethod.title;
  const paymentMethodTitle = getPaymentMethodTitle(
    order.order.deliveryMethod.title as DeliveryMethodEnum,
    order.order.paymentMethod.title
  );
  const contactPersonName = order.order.contactPersonName;
  const contactPersonPhone = order.order.contactPersonPhone;

  return (
    <div className={classes.container}>
      <div className={classes.delimiter} />
      <div className={classes.detailsHeader}>
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
          <div className={classes.info}>{`${deliveryMethodTile}`}</div>
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
      <div className={classes.delimiter} />
    </div>
  );
};

export default OrderDetails;
