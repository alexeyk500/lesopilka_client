import React from 'react';
import classes from './OrderActions.module.css';
import viewIco from '../../../../../../img/eyeIco.svg';
import viewCloseIco from '../../../../../../img/eyeCloseIco.svg';
import billIco from '../../../../../../img/billIco.svg';
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
};

const OrderActions: React.FC<PropsType> = ({ order, isOpenDetails, toggleDetails }) => {
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

  return (
    <div className={classes.container}>
      {!order.order.confirmedManufacturer && (
        <img
          src={isOpenDetails ? viewCloseIco : viewIco}
          className={classes.viewIco}
          alt="view"
          onClick={onClickToggleDetails}
        />
      )}
      {order.order.confirmedManufacturer && <img src={billIco} className={classes.billIco} alt="view" />}
      {getOrderStatusEnumValue(order.order.status) === OrderStatusEnum.onConfirming && (
        <img src={deleteIco} className={classes.deleteIco} alt="view" onClick={onCancelClick} />
      )}
    </div>
  );
};

export default OrderActions;
