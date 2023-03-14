import React from 'react';
import classes from './OrderActions.module.css';
import viewIco from '../../../img/visibilityIcoOn.svg';
import viewCloseIco from '../../../img/visibilityIcoOff.svg';
import chatIco from '../../../img/chatIco.svg';
import chatIcoOff from '../../../img/chatIcoOff.svg';
import cancelIco from '../../../img/cancelIco.svg';
import archiveIco from '../../../img/archiveIco.svg';
import returnToBasket from '../../../img/returnToBasket.svg';
import { OrderType } from '../../../types/types';
import { showPortalPopUp } from '../../PortalPopUp/PortalPopUp';
import { useAppDispatch } from '../../../hooks/hooks';
import { returnToBasketAndCancelOrderByIdThunk } from '../../../store/ordersSlice';

import ToolTip from '../ToolTip/ToolTip';
import {
  checkIsPossibleCancelOrderAndReturnToBasket,
  getIsArchivedOrder,
  getIsItUserOrderOnConfirming,
} from '../../../utils/ordersFunctions';

type PropsType = {
  order: OrderType;
  updateOrders: () => void;
  isOpenDetails: boolean;
  toggleDetails: () => void;
  isOpenChat: boolean;
  toggleChat: () => void;
};

const OrderActions: React.FC<PropsType> = ({
  order,
  isOpenDetails,
  toggleDetails,
  isOpenChat,
  toggleChat,
  updateOrders,
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
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        if (result && token) {
          dispatch(returnToBasketAndCancelOrderByIdThunk({ orderId: order.order.id, token })).then(() => {
            updateOrders();
          });
        }
      },
    });
  };

  const isPossibleReturnToBasket = checkIsPossibleCancelOrderAndReturnToBasket(order.order.status);
  const isArchivedOrder = getIsArchivedOrder(order);
  const isItUserOrderOnConfirming = getIsItUserOrderOnConfirming({ order, isOrderForManufacturer: false });
  const onClickSendToArchive = () => {};

  return (
    <div className={classes.container}>
      <ToolTip text={'Просмотр заказа'} customClass={classes.customTooltipDetails}>
        <img
          src={isOpenDetails ? viewCloseIco : viewIco}
          className={classes.viewIco}
          onClick={toggleDetails}
          alt="view order"
        />
      </ToolTip>

      <ToolTip text={'Переписка по заказу'} customClass={classes.customTooltipChat}>
        <img
          src={isOpenChat ? chatIcoOff : chatIco}
          className={classes.chatIco}
          onClick={toggleChat}
          alt="view order"
        />
      </ToolTip>

      {isPossibleReturnToBasket && (
        <>
          <ToolTip text={'Вернуть товар в корзину и отменить заказ'} customClass={classes.customTooltipReturnToBasket}>
            <img
              src={returnToBasket}
              className={classes.returnToBasketIco}
              alt="return order to basket"
              onClick={onCancelOrderAndReturnToBasket}
            />
          </ToolTip>
          <ToolTip text={'Отменить заказ'} customClass={classes.customTooltipCancel}>
            <img src={cancelIco} className={classes.cancelIco} alt="cancel order" onClick={() => {}} />
          </ToolTip>
        </>
      )}

      {!isArchivedOrder && !isItUserOrderOnConfirming && (
        <ToolTip text={'Убрать заказ в архив'} customClass={classes.customTooltipArchive}>
          <img src={archiveIco} className={classes.archiveIco} alt="archiveIco" onClick={onClickSendToArchive} />
        </ToolTip>
      )}
    </div>
  );
};

export default OrderActions;
