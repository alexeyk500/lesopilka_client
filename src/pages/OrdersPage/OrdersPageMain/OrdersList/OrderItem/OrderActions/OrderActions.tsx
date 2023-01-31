import React from 'react';
import classes from './OrderActions.module.css';
import viewIco from '../../../../../../img/eyeIco.svg';
import viewCloseIco from '../../../../../../img/eyeCloseIco.svg';
import billIco from '../../../../../../img/billIco.svg';
import billIcoHide from '../../../../../../img/billIcoHide.svg';
import deleteIco from '../../../../../../img/deleteBlueIco.svg';
import { OrderStatusEnum, OrderType } from '../../../../../../types/types';
import { getOrderStatusEnumValue } from '../OrderStatus/OrderStatus';
import { showPortalPopUp } from '../../../../../../components/PortalPopUp/PortalPopUp';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import {
  cancelOrderByIdThunk,
  getOrdersThunk,
  selectorSelectedOrderDateFrom,
  selectorSelectedOrderDateTo,
  selectorSelectedOrderStatusId,
} from '../../../../../../store/ordersSlice';
import { orderStatusOptions } from '../../../../OrdersPageControl/OrderStatusSelector/OrderStatusSelector';
import { convertOrdersStatusToServerOrdersStatus } from '../../../../../../utils/functions';

type PropsType = {
  order: OrderType;
  isOpenDetails: boolean;
  toggleDetails: () => void;
  isOpenConfirmation: boolean;
  toggleConfirmation: () => void;
};

const checkIsPossibleToCancelOrder = (orderStatus: OrderStatusEnum) => {
  if (getOrderStatusEnumValue(orderStatus) === OrderStatusEnum.onConfirming) {
    return true;
  } else if (getOrderStatusEnumValue(orderStatus) === OrderStatusEnum.onPaymentWaiting) {
    return true;
  }
  return false;
};

const OrderActions: React.FC<PropsType> = ({
  order,
  isOpenDetails,
  toggleDetails,
  isOpenConfirmation,
  toggleConfirmation,
}) => {
  const dispatch = useAppDispatch();
  const dateFrom = useAppSelector(selectorSelectedOrderDateFrom);
  const dateTo = useAppSelector(selectorSelectedOrderDateTo);
  const selectedOrderStatusId = useAppSelector(selectorSelectedOrderStatusId);
  const ordersStatus = orderStatusOptions.find((option) => option.id === selectedOrderStatusId)?.title;
  const serverOrdersStatus = convertOrdersStatusToServerOrdersStatus(ordersStatus!);

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
        if (result && token && dateFrom && dateTo && serverOrdersStatus) {
          dispatch(cancelOrderByIdThunk({ orderId: order.order.id, token })).then(() => {
            dispatch(getOrdersThunk({ dateFrom, dateTo, ordersStatus: serverOrdersStatus, token }));
          });
        }
      },
    });
  };

  const onClickToggleDetails = () => {
    toggleDetails();
  };

  const isPossibleToCancelOrder = checkIsPossibleToCancelOrder(order.order.status);

  return (
    <div className={classes.container}>
      <img
        src={isOpenDetails ? viewCloseIco : viewIco}
        className={classes.viewIco}
        onClick={onClickToggleDetails}
        alt="view order"
      />
      {order.order.confirmedManufacturer && (
        <img
          src={isOpenConfirmation ? billIcoHide : billIco}
          className={classes.billIco}
          onClick={toggleConfirmation}
          alt="view confirmation"
        />
      )}
      {isPossibleToCancelOrder && (
        <img src={deleteIco} className={classes.deleteIco} alt="cancel order" onClick={onCancelClick} />
      )}
    </div>
  );
};

export default OrderActions;
