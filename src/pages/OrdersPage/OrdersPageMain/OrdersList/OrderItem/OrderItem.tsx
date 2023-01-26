import React from 'react';
import classes from './OrderItem.module.css';
import listClasses from '../OrdersList.module.css';
import { OrderType } from '../../../../../types/types';
import { formatUTCtoDDMMYYYY } from '../../../../../utils/dateTimeFunctions';
import classNames from 'classnames';
import { getTotalLogisticInfo } from '../../../../../utils/functions';
import OrderActions from './OrderActions/OrderActions';
import OrderStatus from './OrderStatus/OrderStatus';

type PropsType = {
  order: OrderType;
};

const OrderItem: React.FC<PropsType> = ({ order }) => {
  const manufacturerTitle = order.products[0].manufacturer?.title ?? '';
  const { totalWeight, totalVolume, totalCost } = getTotalLogisticInfo(order.products);

  return (
    <div className={classes.container}>
      <div className={listClasses.tableColumnDate}>{formatUTCtoDDMMYYYY(order.order.date)}</div>
      <div className={listClasses.tableColumnNumber}>{order.order.id}</div>
      <div className={classNames(listClasses.tableColumnManufacturer, classes.leftAlignment)}>{manufacturerTitle}</div>
      <div className={classNames(listClasses.tableColumnWeight, classes.leftAlignment)}>{`${totalWeight} кг.`}</div>
      <div className={classNames(listClasses.tableColumnVolume, classes.leftAlignment)}>{`${totalVolume} м.куб.`}</div>
      <div className={classNames(listClasses.tableColumnDelivery, classes.leftAlignment)}>{'Расчет'}</div>
      <div className={classNames(listClasses.tableColumnCost, classes.leftAlignment)}>{`${totalCost} руб.`}</div>
      <div className={classNames(listClasses.tableColumnActions)}>
        <OrderActions />
      </div>
      <div className={classNames(listClasses.tableColumnStatus)}>
        <OrderStatus status={order.order.status} />
      </div>
    </div>
  );
};

export default OrderItem;
