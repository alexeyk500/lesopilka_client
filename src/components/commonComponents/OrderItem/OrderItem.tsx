import React, { useState } from 'react';
import classes from './OrderItem.module.css';
import listClasses from '../../../pages/UserOrdersPage/UserOrdersPageMain/UserOrdersList/UserOrdersList.module.css';
import { AmountTypeEnum, OrderType } from '../../../types/types';
import { formatUTCtoDDMMYYYY } from '../../../utils/dateTimeFunctions';
import { getTotalLogisticInfo } from '../../../utils/functions';
import OrderActions from '../OrderActions/OrderActions';
import OrderStatus from '../OrderStatus/OrderStatus';
import OrderDetails from '../OrderDetails/OrderDetails';
import classNames from 'classnames';
import { getDeliveryTitle } from '../../../utils/ordersFunctions';
import ManOrderDetails from '../../../pages/ManufacturerOrdersPage/ManOrdersPageMain/ManOrdersList/ManOrderDetails/ManOrderDetails';

type PropsType = {
  order: OrderType;
  updateOrders: () => void;
  isOrderForManufacturer?: boolean;
};

const OrderItem: React.FC<PropsType> = ({ order, updateOrders, isOrderForManufacturer }) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);

  const title = isOrderForManufacturer
    ? order.order.userInfo?.name || order.order.userInfo?.email || ''
    : order.products[0].manufacturer?.title ?? '';

  const { totalWeight, totalVolume, totalCost } = getTotalLogisticInfo(order.products, AmountTypeEnum.inOrder);

  const deliveryTitle = getDeliveryTitle(order.order.deliveryMethod.title, order.order.deliveryPrice);

  const toggleDetails = () => {
    setIsOpenDetails((prev) => !prev);
  };

  const toggleChat = () => {
    setIsOpenChat((prev) => !prev);
  };

  return (
    <div className={classes.container}>
      <div className={classes.itemContainer}>
        <div className={listClasses.tableColumnDate}>{formatUTCtoDDMMYYYY(order.order.deliveryDate)}</div>
        <div className={listClasses.tableColumnNumber}>{order.order.id}</div>
        <div className={listClasses.tableColumnManufacturer}>{title}</div>
        <div className={listClasses.tableColumnWeight}>{`${totalWeight} кг.`}</div>
        <div className={listClasses.tableColumnVolume}>{`${totalVolume} м.куб.`}</div>
        <div className={listClasses.tableColumnCost}>{`${totalCost} руб.`}</div>
        <div className={listClasses.tableColumnDelivery}>{deliveryTitle}</div>
        <div className={listClasses.tableColumnActions}>
          <OrderActions
            order={order}
            updateOrders={updateOrders}
            isOpenDetails={isOpenDetails}
            toggleDetails={toggleDetails}
            isOpenChat={isOpenChat}
            toggleChat={toggleChat}
            isOrderForManufacturer={isOrderForManufacturer}
          />
        </div>
        <div className={classNames(listClasses.tableColumnStatus, classes.rightAlign)}>
          <OrderStatus order={order} isOrderForManufacturer={isOrderForManufacturer!} />
        </div>
      </div>
      {isOpenDetails && isOrderForManufacturer && <ManOrderDetails order={order} updateOrders={updateOrders} />}
      {isOpenDetails && !isOrderForManufacturer && <OrderDetails order={order} />}
    </div>
  );
};

export default OrderItem;
