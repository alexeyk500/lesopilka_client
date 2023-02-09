import React from 'react';
import classes from './OrderActions.module.css';
import viewIco from '../../../../../../img/eyeIco.svg';
import viewCloseIco from '../../../../../../img/eyeCloseIco.svg';
import deleteIco from '../../../../../../img/deleteBlueIco.svg';
import { OrderType } from '../../../../../../types/types';
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
import ToolTip from '../../../../../../components/commonComponents/ToolTip/ToolTip';
import { checkIsPossibleToCancelOrder } from '../../../../../../utils/ordersFunctions';

type PropsType = {
  order: OrderType;
  isOpenDetails: boolean;
  toggleDetails: () => void;
};

const OrderActions: React.FC<PropsType> = ({ order, isOpenDetails, toggleDetails }) => {
  const dispatch = useAppDispatch();
  const orderDateFrom = useAppSelector(selectorSelectedOrderDateFrom);
  const orderDateTo = useAppSelector(selectorSelectedOrderDateTo);
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
        if (result && token && orderDateFrom && orderDateTo && serverOrdersStatus) {
          dispatch(cancelOrderByIdThunk({ orderId: order.order.id, token })).then(() => {
            dispatch(getOrdersThunk({ orderDateFrom, orderDateTo, ordersStatus: serverOrdersStatus, token }));
          });
        }
      },
    });
  };

  const isPossibleToCancelOrder = checkIsPossibleToCancelOrder(order.order.status);

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

      {isPossibleToCancelOrder && (
        <ToolTip text={'Отмена заказа'} customClass={classes.customTooltipCancel}>
          <img src={deleteIco} className={classes.deleteIco} alt="cancel order" onClick={onCancelClick} />
        </ToolTip>
      )}
    </div>
  );
};

export default OrderActions;
