import React, { useState } from 'react';
import classes from './OrderItem.module.css';
import listClasses from '../OrdersList.module.css';
import { OrderType, ServerDeliveryMethodEnum } from '../../../../../types/types';
import { formatUTCtoDDMMYYYY } from '../../../../../utils/dateTimeFunctions';
import { formatPrice, getTotalLogisticInfo } from '../../../../../utils/functions';
import OrderActions from './OrderActions/OrderActions';
import OrderStatus from './OrderStatus/OrderStatus';
import OrderDetails from './OrderDetails/OrderDetails';

type PropsType = {
  order: OrderType;
};

const getDeliveryTitle = (deliveryMethodTile: string) => {
  if (deliveryMethodTile === ServerDeliveryMethodEnum.selfPickUp) {
    return deliveryMethodTile;
  }
  const deliveryCost = formatPrice(3500);
  return `${deliveryMethodTile} -\n${deliveryCost} руб.`;
};

const OrderItem: React.FC<PropsType> = ({ order }) => {
  const manufacturerTitle = order.products[0].manufacturer?.title ?? '';
  const { totalWeight, totalVolume, totalCost } = getTotalLogisticInfo(order.products);

  const deliveryTitle = getDeliveryTitle(order.order.deliveryMethod.title);

  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const toggleDetails = () => {
    setIsOpenDetails((prev) => !prev);
  };

  return (
    <div className={classes.container}>
      <div className={classes.itemContainer}>
        <div className={listClasses.tableColumnDate}>{formatUTCtoDDMMYYYY(order.order.date)}</div>
        <div className={listClasses.tableColumnNumber}>{order.order.id}</div>
        <div className={listClasses.tableColumnManufacturer}>{manufacturerTitle}</div>
        <div className={listClasses.tableColumnWeight}>{`${totalWeight} кг.`}</div>
        <div className={listClasses.tableColumnVolume}>{`${totalVolume} м.куб.`}</div>
        <div className={listClasses.tableColumnDelivery}>{deliveryTitle}</div>
        <div className={listClasses.tableColumnCost}>{`${totalCost} руб.`}</div>
        <div className={listClasses.tableColumnActions}>
          <OrderActions order={order} isOpenDetails={isOpenDetails} toggleDetails={toggleDetails} />
        </div>
        <div className={listClasses.tableColumnStatus}>
          <OrderStatus status={order.order.status} />
        </div>
      </div>
      {isOpenDetails && <OrderDetails order={order} />}
    </div>
  );
};

export default OrderItem;
