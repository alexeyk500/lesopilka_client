import React, { useState } from 'react';
import classes from './OrderItem.module.css';
import listClasses from '../OrdersList.module.css';
import { AmountTypeEnum, OrderType } from '../../../../../types/types';
import { formatUTCtoDDMMYYYY } from '../../../../../utils/dateTimeFunctions';
import { getTotalLogisticInfo } from '../../../../../utils/functions';
import OrderActions from './OrderActions/OrderActions';
import OrderStatus from './OrderStatus/OrderStatus';
import OrderDetails from './OrderDetails/OrderDetails';
import classNames from 'classnames';
import { getDeliveryTitle } from '../../../../../utils/ordersFunctions';

type PropsType = {
  order: OrderType;
};

const OrderItem: React.FC<PropsType> = ({ order }) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const manufacturerTitle = order.products[0].manufacturer?.title ?? '';
  const { totalWeight, totalVolume, totalCost } = getTotalLogisticInfo(order.products, AmountTypeEnum.inOrder);

  const deliveryTitle = getDeliveryTitle(order.order.deliveryMethod.title, order.order.deliveryPrice);

  const toggleDetails = () => {
    setIsOpenDetails((prev) => !prev);
  };

  return (
    <div className={classes.container}>
      <div className={classes.itemContainer}>
        <div className={listClasses.tableColumnDate}>{formatUTCtoDDMMYYYY(order.order.deliveryDate)}</div>
        <div className={listClasses.tableColumnNumber}>{order.order.id}</div>
        <div className={listClasses.tableColumnManufacturer}>{manufacturerTitle}</div>
        <div className={listClasses.tableColumnWeight}>{`${totalWeight} кг.`}</div>
        <div className={listClasses.tableColumnVolume}>{`${totalVolume} м.куб.`}</div>
        <div className={listClasses.tableColumnCost}>{`${totalCost} руб.`}</div>
        <div className={listClasses.tableColumnDelivery}>{deliveryTitle}</div>
        <div className={listClasses.tableColumnActions}>
          <OrderActions order={order} isOpenDetails={isOpenDetails} toggleDetails={toggleDetails} />
        </div>
        <div className={classNames(listClasses.tableColumnStatus, classes.rightAlign)}>
          <OrderStatus status={order.order.status} />
        </div>
      </div>
      {isOpenDetails && <OrderDetails order={order} />}
    </div>
  );
};

export default OrderItem;
