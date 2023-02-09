import React, { useState } from 'react';
import classes from './OrderItem.module.css';
import listClasses from '../OrdersList.module.css';
import { OrderType, ServerDeliveryMethodEnum } from '../../../../../types/types';
import { formatUTCtoDDMMYYYY } from '../../../../../utils/dateTimeFunctions';
import { formatPrice, getTotalLogisticInfo } from '../../../../../utils/functions';
import OrderActions from './OrderActions/OrderActions';
import OrderStatus from './OrderStatus/OrderStatus';
import OrderDetails from './OrderDetails/OrderDetails';
import classNames from 'classnames';

type PropsType = {
  order: OrderType;
};

export const getDeliveryTitle = (deliveryMethodTile: string, deliveryPrice?: number, oneRow?: boolean) => {
  if (deliveryMethodTile === ServerDeliveryMethodEnum.selfPickUp) {
    return deliveryMethodTile;
  }
  if (deliveryMethodTile === ServerDeliveryMethodEnum.delivery) {
    if (deliveryPrice !== undefined) {
      if (deliveryPrice === null) {
        return oneRow ? `${deliveryMethodTile}, стоимость доставки заказа - на подсчете у поставщика` : 'На подсчете';
      }
      if (deliveryPrice === 0) {
        return oneRow ? `${deliveryMethodTile}. Поставщик доставит вам заказ бесплатно` : 'Бесплатно';
      } else {
        return oneRow
          ? `${deliveryMethodTile}, стоимость доставки заказа - ${formatPrice(deliveryPrice)} руб.`
          : `${formatPrice(deliveryPrice)} руб.`;
      }
    }
  }
};

const OrderItem: React.FC<PropsType> = ({ order }) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [isOpenDivergence, setIsOpenDivergence] = useState(false);

  const manufacturerTitle = order.products[0].manufacturer?.title ?? '';
  const { totalWeight, totalVolume, totalCost } = getTotalLogisticInfo(order.products);

  const deliveryTitle = getDeliveryTitle(order.order.deliveryMethod.title, order.order.deliveryPrice);

  const toggleDetails = () => {
    setIsOpenDetails((prev) => !prev);
    isOpenConfirmation && setIsOpenConfirmation(false);
    isOpenDivergence && setIsOpenDivergence(false);
  };

  const toggleConfirmation = () => {
    setIsOpenConfirmation((prev) => !prev);
    isOpenDetails && setIsOpenDetails(false);
    isOpenDivergence && setIsOpenDivergence(false);
  };

  const toggleDivergence = () => {
    setIsOpenDivergence((prev) => !prev);
    isOpenDetails && setIsOpenDetails(false);
    isOpenConfirmation && setIsOpenConfirmation(false);
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
          <OrderActions
            order={order}
            isOpenDetails={isOpenDetails}
            toggleDetails={toggleDetails}
            isOpenConfirmation={isOpenConfirmation}
            toggleConfirmation={toggleConfirmation}
            isOpenDivergence={isOpenDivergence}
            toggleDivergence={toggleDivergence}
          />
        </div>
        <div className={classNames(listClasses.tableColumnStatus, classes.rightAlign)}>
          <OrderStatus status={order.order.status} />
        </div>
      </div>
      {isOpenDetails && <OrderDetails order={order} />}
      {isOpenConfirmation && <OrderDetails order={order} isConfirmation />}
      {isOpenDivergence && <OrderDetails order={order} isDivergence />}
    </div>
  );
};

export default OrderItem;
