import React from 'react';
import classes from './OrderActions.module.css';
import orderListIco from '../../../img/orderListIco.svg';
import orderListCloseIco from '../../../img/orderListCloseIco.svg';
import chatIco from '../../../img/chatIco.svg';
import chatIcoOff from '../../../img/chatIcoOff.svg';
import cancelIco from '../../../img/cancelIco.svg';
import archiveIco from '../../../img/archiveIco.svg';
import returnToBasket from '../../../img/returnToBasket.svg';
import deliveryIco from '../../../img/deliveryIco.svg';
import deliveryIcoClose from '../../../img/deliveryIcoClose.svg';
import { DeliveryMethodEnum, OrderType } from '../../../types/types';
import { showPortalPopUp } from '../../PortalPopUp/PortalPopUp';
import { useAppDispatch } from '../../../hooks/hooks';
import { archiveOrderThunk, cancelOrderThunk, returnToBasketAndCancelOrderByIdThunk } from '../../../store/ordersSlice';

import ToolTip from '../ToolTip/ToolTip';
import {
  getIsArchivedOrder,
  getIsOrderOnConfirming,
  getIsOrderConfirmed,
  getIsOrderCanceledByUser,
  getIsOrderCanceledManufacturer,
} from '../../../utils/ordersFunctions';

type PropsType = {
  order: OrderType;
  updateOrders: () => void;
  isOpenDetails: boolean;
  toggleDetails: () => void;
  isOpenManDelivery: boolean;
  toggleManDelivery: () => void;
  isOpenChat: boolean;
  toggleChat: () => void;
  isOrderForManufacturer?: boolean;
};

const OrderActions: React.FC<PropsType> = ({
  order,
  isOpenDetails,
  toggleDetails,
  isOpenManDelivery,
  toggleManDelivery,
  isOpenChat,
  toggleChat,
  updateOrders,
  isOrderForManufacturer,
}) => {
  const dispatch = useAppDispatch();

  const onCancelOrderAndReturnToBasket = () => {
    showPortalPopUp({
      popUpContent: (
        <div className={classes.infoPopUpText}>
          {'\n\nПодтвердите\nвозврат товара в корзину\nи отмену заказа.\n\n\n'}
        </div>
      ),
      titleConfirmBtn: 'Отменить заказ',
      customClassBottomBtnGroup: classes.customPopUpBottomBtnGroup,
      onClosePopUp: (result?: boolean | FormData | undefined) => {
        if (result) {
          returnToBasketAndCancelOrder();
        }
      },
    });
  };
  const returnToBasketAndCancelOrder = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      dispatch(returnToBasketAndCancelOrderByIdThunk({ orderId: order.order.id, token })).then(() => {
        updateOrders();
      });
    }
  };

  const onClickSendToArchive = () => {
    showPortalPopUp({
      popUpContent: (
        <div className={classes.infoPopUpText}>
          {'\nПодтвердите\nперемещение заказа в Архив?\n\n'}
          <div className={classes.smallText}>{'все дальнейшие действия\nс заказом\nбудут невозможны\n\n\n'}</div>
        </div>
      ),
      titleConfirmBtn: 'Архивировать',
      customClassBottomBtnGroup: classes.customPopUpBottomBtnGroup,
      onClosePopUp: (result?: boolean | FormData | undefined) => {
        if (result) {
          sendToArchive();
        }
      },
    });
  };
  const sendToArchive = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (order.order.id && token) {
      dispatch(archiveOrderThunk({ orderId: order.order.id, isOrderForManufacturer, token })).then(() => {
        updateOrders();
      });
    }
  };

  const onClickCancelOrder = () => {
    showPortalPopUp({
      popUpContent: <div className={classes.infoPopUpText}>{'\nПодтвердите\nотмену заказа\n\n\n'}</div>,
      titleConfirmBtn: 'Отменить',
      customClassBottomBtnGroup: classes.customPopUpBottomBtnGroup,
      onClosePopUp: (result?: boolean | FormData | undefined) => {
        if (result) {
          cancelOrder();
        }
      },
    });
  };
  const cancelOrder = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (order.order.id && token) {
      dispatch(cancelOrderThunk({ orderId: order.order.id, isOrderForManufacturer, token })).then(() => {
        updateOrders();
      });
    }
  };

  const isArchivedOrder = getIsArchivedOrder(order, isOrderForManufacturer);
  const isOrderConfirmed = getIsOrderConfirmed(order);
  const isOrderOnConfirming = getIsOrderOnConfirming(order);
  const isOrderCanceledByUser = getIsOrderCanceledByUser(order);
  const isOrderCanceledManufacturer = getIsOrderCanceledManufacturer(order);

  const ViewOrderBtn: React.FC = () => {
    return (
      <ToolTip text={'Товары в заказе'} customClass={classes.customTooltipOrderListIco}>
        <img
          src={isOpenDetails ? orderListCloseIco : orderListIco}
          className={classes.orderList}
          onClick={toggleDetails}
          alt="view order"
        />
      </ToolTip>
    );
  };
  const ViewManDelivery: React.FC = () => {
    return (
      <ToolTip text={'Согласование доставки'} customClass={classes.customManDelivery}>
        <img
          src={isOpenManDelivery ? deliveryIcoClose : deliveryIco}
          className={classes.deliveryIco}
          onClick={toggleManDelivery}
          alt="view delivery"
        />
      </ToolTip>
    );
  };
  const ViewMessagesBtn: React.FC = () => {
    return (
      <ToolTip text={'Переписка по заказу'} customClass={classes.customTooltipChat}>
        <img
          src={isOpenChat ? chatIcoOff : chatIco}
          className={classes.chatIco}
          onClick={toggleChat}
          alt="view messages"
        />
      </ToolTip>
    );
  };
  const ReturnToBasketBtn: React.FC = () => {
    return (
      <ToolTip text={'Вернуть товар в корзину и отменить заказ'} customClass={classes.customTooltipReturnToBasket}>
        <img
          src={returnToBasket}
          className={classes.returnToBasketIco}
          alt="return order to basket"
          onClick={onCancelOrderAndReturnToBasket}
        />
      </ToolTip>
    );
  };
  const CancelOrderBtn: React.FC = () => {
    return (
      <ToolTip text={'Отменить заказ'} customClass={classes.customTooltipCancel}>
        <img src={cancelIco} className={classes.cancelIco} alt="cancel order" onClick={onClickCancelOrder} />
      </ToolTip>
    );
  };
  const ArchiveOrderBtn: React.FC = () => {
    return (
      <ToolTip text={'Убрать заказ в архив'} customClass={classes.customTooltipArchive}>
        <img src={archiveIco} className={classes.archiveIco} alt="archiveIco" onClick={onClickSendToArchive} />
      </ToolTip>
    );
  };

  const OrderOnConfirmingButtons: React.FC = () => {
    return isOrderForManufacturer ? (
      order.order.deliveryMethod.title === DeliveryMethodEnum.delivery ? (
        <ViewManDelivery />
      ) : null
    ) : (
      <>
        <ReturnToBasketBtn />
        <CancelOrderBtn />
      </>
    );
  };
  const OrderConfirmedButtons: React.FC = () => {
    return isOrderForManufacturer ? (
      <>
        <ArchiveOrderBtn />
      </>
    ) : (
      <>
        <ArchiveOrderBtn />
        <CancelOrderBtn />
      </>
    );
  };
  const OrderCanceledByUserButtons: React.FC = () => {
    return <ArchiveOrderBtn />;
  };
  const OrderCanceledManufacturerButtons: React.FC = () => {
    return <ArchiveOrderBtn />;
  };

  return (
    <div className={classes.container}>
      <ViewOrderBtn />
      <ViewMessagesBtn />
      {!isArchivedOrder ? (
        isOrderOnConfirming ? (
          <OrderOnConfirmingButtons />
        ) : isOrderConfirmed ? (
          <OrderConfirmedButtons />
        ) : isOrderCanceledByUser ? (
          <OrderCanceledByUserButtons />
        ) : isOrderCanceledManufacturer ? (
          <OrderCanceledManufacturerButtons />
        ) : null
      ) : null}
    </div>
  );
};

export default OrderActions;
