import React, { useEffect, useState } from 'react';
import classes from './OrderItem.module.css';
import listClasses from '../commonComponents/OrderItemTableTile/OrderItemTableTile.module.css';
import { AmountTypeEnum, OrderType } from '../../types/types';
import { formatUTCtoDDMMYYYY } from '../../utils/dateTimeFunctions';
import { getTotalLogisticInfo } from '../../utils/functions';
import OrderActions from '../commonComponents/OrderActions/OrderActions';
import OrderStatus from '../commonComponents/OrderStatus/OrderStatus';
import OrderDetails from '../commonComponents/OrderDetails/OrderDetails';
import classNames from 'classnames';
import { getDeliveryTitle, getIsArchivedOrder, getIsOrderOnConfirming } from '../../utils/ordersFunctions';
import ManOrderDetails from '../../pages/ManufacturerOrdersPage/ManOrdersPageMain/ManOrdersList/ManOrderDetails/ManOrderDetails';
import OrderMessagesSection from '../commonComponents/OrderMessagesSection/OrderMessagesSection';
import { CreateOrderMessagesParamsType } from '../../api/orderMessagesApi';
import { useAppDispatch } from '../../hooks/hooks';
import { createOrderMessagesThunk, getOrderMessagesThunk } from '../../store/orderMessagesSlice';
import ManDetailsDeliveryConfirmation from '../../pages/ManufacturerOrdersPage/ManOrdersPageMain/ManOrdersList/ManOrderDetails/ManDetailsDeliveryConfirmation/ManDetailsDeliveryConfirmation';

type PropsType = {
  order: OrderType;
  updateOrders: () => void;
  openDetails?: boolean;
  isManufacturer?: boolean;
};

const OrderItem: React.FC<PropsType> = ({ order, updateOrders, openDetails, isManufacturer }) => {
  const dispatch = useAppDispatch();
  const [isOpenDetails, setIsOpenDetails] = useState(!!openDetails);
  const [isOpenMessage, setIsOpenMessage] = useState(!!openDetails);
  const [isOpenManDelivery, setIsOpenManDelivery] = useState(!!openDetails);

  const [freeDelivery, setFreeDelivery] = useState(false);
  const [confirmedDeliveryPrice, setConfirmedDeliveryPrice] = useState<number | null>(order.order.deliveryPrice);

  useEffect(() => {
    if (freeDelivery) {
      setConfirmedDeliveryPrice(null);
    }
  }, [freeDelivery]);

  const isArchivedOrder = getIsArchivedOrder(order);
  const isOrderOnConfirming = getIsOrderOnConfirming(order);

  console.log(order.order);

  const title = isManufacturer
    ? order.order.userInfo?.name || order.order.userInfo?.email || ''
    : order.products[0]?.manufacturer?.title ?? '';

  const { totalWeight, totalVolume, totalCost } = getTotalLogisticInfo(order.products, AmountTypeEnum.inOrder);

  const deliveryTitle = getDeliveryTitle(order.order.deliveryMethod.title, order.order.deliveryPrice);

  const toggleDetails = () => {
    setIsOpenDetails((prev) => !prev);
  };

  const toggleManDelivery = () => {
    setIsOpenManDelivery((prev) => !prev);
  };

  const toggleChat = () => {
    setIsOpenMessage((prev) => !prev);
  };

  const onOrderStatusClick = () => {
    if (isOpenDetails) {
      setIsOpenDetails(false);
      setIsOpenMessage(false);
      setIsOpenManDelivery(false);
    } else {
      setIsOpenDetails(true);
      setIsOpenMessage(true);
      setIsOpenManDelivery(true);
    }
  };

  const sendNewOrderMessage = (message: string) => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token && order.order.id && message.length > 0) {
      const createOrderMessagesParams: CreateOrderMessagesParamsType = {
        orderId: order.order.id,
        isManufacturerMessage: !!isManufacturer,
        messageText: message,
        token,
      };
      dispatch(createOrderMessagesThunk(createOrderMessagesParams)).then(() => {
        dispatch(getOrderMessagesThunk({ orderId: order.order.id, token }));
      });
    }
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
            isOpenManDelivery={isOpenManDelivery}
            toggleManDelivery={toggleManDelivery}
            isOpenChat={isOpenMessage}
            toggleChat={toggleChat}
            isOrderForManufacturer={isManufacturer}
          />
        </div>
        <div className={classNames(listClasses.tableColumnStatus, classes.rightAlign)}>
          <OrderStatus order={order} onOrderStatusClick={onOrderStatusClick} isOrderForManufacturer={isManufacturer!} />
        </div>
      </div>
      {isOpenDetails && isManufacturer && (
        <ManOrderDetails
          order={order}
          updateOrders={updateOrders}
          freeDelivery={freeDelivery}
          confirmedDeliveryPrice={confirmedDeliveryPrice}
        />
      )}
      {isManufacturer && isOpenManDelivery && isOrderOnConfirming && (
        <ManDetailsDeliveryConfirmation
          order={order}
          freeDelivery={freeDelivery}
          setFreeDelivery={setFreeDelivery}
          confirmedDeliveryPrice={confirmedDeliveryPrice}
          setConfirmedDeliveryPrice={setConfirmedDeliveryPrice}
        />
      )}
      {isOpenDetails && !isManufacturer && <OrderDetails order={order} />}
      {isOpenMessage && (
        <OrderMessagesSection
          order={order}
          isOrderForManufacturer={isManufacturer}
          sendNewOrderMessage={isArchivedOrder ? undefined : sendNewOrderMessage}
        />
      )}
    </div>
  );
};

export default OrderItem;
