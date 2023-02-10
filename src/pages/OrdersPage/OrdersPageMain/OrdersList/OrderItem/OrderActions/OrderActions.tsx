import React from 'react';
import classes from './OrderActions.module.css';
import viewIco from '../../../../../../img/visibilityIcoOn.svg';
import viewCloseIco from '../../../../../../img/visibilityIcoOff.svg';
import chatIco from '../../../../../../img/chatIco.svg';
import chatIcoOff from '../../../../../../img/chatIcoOff.svg';
import deleteIco from '../../../../../../img/deleteBlueIco.svg';
import returnToBasket from '../../../../../../img/returnToBasket.svg';
import { OrderType } from '../../../../../../types/types';
import { showPortalPopUp } from '../../../../../../components/PortalPopUp/PortalPopUp';
import { useAppDispatch } from '../../../../../../hooks/hooks';
import { returnToBasketAndCancelOrderByIdThunk } from '../../../../../../store/ordersSlice';

import ToolTip from '../../../../../../components/commonComponents/ToolTip/ToolTip';
import { checkIsPossibleCancelOrderAndReturnToBasket } from '../../../../../../utils/ordersFunctions';

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

  const onCancelClick = () => {
    showPortalPopUp({
      popUpContent: (
        <div className={classes.infoPopUpText}>
          {'\n\nПодтвердите отмену заказа?\n\nТовары из заказа вернутся\nв вашу корзину.\n\n\n'}
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

  return (
    <div className={classes.container}>
      <ToolTip text={'Детали заказа'} customClass={classes.customTooltipDetails}>
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
        <ToolTip text={'Отменить заказ и вернуть товар в корзину'} customClass={classes.customTooltipReturnToBasket}>
          <img
            src={returnToBasket}
            className={classes.returnToBasketIco}
            alt="return order to basket"
            onClick={() => {}}
          />
        </ToolTip>
      )}

      <ToolTip text={'Удалить заказ'} customClass={classes.customTooltipCancel}>
        <img src={deleteIco} className={classes.deleteIco} alt="delete order" onClick={onCancelClick} />
      </ToolTip>
    </div>
  );
};

export default OrderActions;
