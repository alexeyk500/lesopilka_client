import React from 'react';
import classes from './OrderDetails.module.css';
import { DeliveryMethodEnum, OrderType } from '../../../../../../types/types';
import { formatUTCtoDDMMMMYYYY } from '../../../../../../utils/dateTimeFunctions';
import { getPaymentMethodTitle } from '../../../../../NewOrderPage/NewOrderPageMainPart/PaymentMethodSection/PaymentMethodSection';
import ListProductsInOrder from '../../../../../BasketPage/BasketPageMainPart/BasketList/OrderToManufacturer/ListProductsInOrder/ListProductsInOrder';
import { getTotalLogisticInfo } from '../../../../../../utils/functions';
import { getDeliveryTitle } from '../OrderItem';

type PropsType = {
  order: OrderType;
  isConfirmation?: boolean;
};

const OrderDetails: React.FC<PropsType> = ({ order, isConfirmation }) => {
  const manufacturerTitle = order.products[0].manufacturer?.title ?? '';
  const manufacturerLocationTitle = order.products[0].manufacturer?.address.location.title ?? '';
  const manufacturerPhone = order.products[0].manufacturer?.phone ?? '';
  const manufacturerEmail = order.products[0].manufacturer?.email ?? '';

  const deliveryDate = formatUTCtoDDMMMMYYYY(order.order.date);
  const deliveryTitle = getDeliveryTitle(order.order.deliveryMethod.title, order.order.deliveryPrice, true);
  const paymentMethodTitle = getPaymentMethodTitle(
    order.order.deliveryMethod.title as DeliveryMethodEnum,
    order.order.paymentMethod.title
  );
  const contactPersonName = order.order.contactPersonName;
  const contactPersonPhone = order.order.contactPersonPhone;

  let totalWeight;
  let totalVolume;
  let totalCost;
  let logisticInfo;

  if (isConfirmation) {
    if (order.confirmedProducts) {
      logisticInfo = getTotalLogisticInfo(order.confirmedProducts);
    }
  } else {
    logisticInfo = getTotalLogisticInfo(order.products);
  }
  if (logisticInfo) {
    totalWeight = logisticInfo.totalWeight;
    totalVolume = logisticInfo.totalVolume;
    totalCost = logisticInfo.totalCost;
  }

  const productsList = isConfirmation ? (order.confirmedProducts ? order.confirmedProducts : []) : order.products;

  return (
    <div className={classes.container}>
      <div className={classes.delimiterDotted} />
      <div className={classes.detailsHeader}>
        {isConfirmation ? (
          <div
            className={classes.titleRow}
          >{`Подтвержденние заказа от поставщика\nЗаказ № ${order.order.id} на ${deliveryDate}`}</div>
        ) : (
          <div className={classes.titleRow}>{`Заказ № ${order.order.id} на ${deliveryDate}`}</div>
        )}
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
      <div className={classes.delimiter} />
      {isConfirmation ? (
        <ListProductsInOrder order={order} products={productsList} isConfirmation />
      ) : (
        <ListProductsInOrder order={order} products={productsList} onlyView />
      )}
      <div className={classes.delimiter} />
      <div className={classes.conclusionRow}>
        <div className={classes.allWeightTitle}>{`Вес: ${totalWeight} кг`}</div>
        <div className={classes.allVolumeTitle}>{`Обьем: ${totalVolume} м.куб.`}</div>
        <div className={classes.allCostTitle}>{`Сумма: ${totalCost} руб.`}</div>
      </div>
    </div>
  );
};

export default OrderDetails;
