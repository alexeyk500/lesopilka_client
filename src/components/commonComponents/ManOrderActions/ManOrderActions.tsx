import React from 'react';
import classes from './ManOrderActions.module.css';
import viewIco from '../../../img/visibilityIcoOn.svg';
import viewCloseIco from '../../../img/visibilityIcoOff.svg';
import chatIco from '../../../img/chatIco.svg';
import chatIcoOff from '../../../img/chatIcoOff.svg';
import archiveIco from '../../../img/archiveIco.svg';
import { OrderType } from '../../../types/types';

import ToolTip from '../ToolTip/ToolTip';
import { getIsArchivedOrder } from '../../../utils/ordersFunctions';
import { useAppDispatch } from '../../../hooks/hooks';
import { archiveManufacturerOrderThunk } from '../../../store/manOrdersSlice';
import { showPortalPopUp } from '../../PortalPopUp/PortalPopUp';

type PropsType = {
  order: OrderType;
  updateOrders: () => void;
  isOpenDetails: boolean;
  toggleDetails: () => void;
  isOpenChat: boolean;
  toggleChat: () => void;
};

const ManOrderActions: React.FC<PropsType> = ({
  order,
  isOpenDetails,
  toggleDetails,
  isOpenChat,
  toggleChat,
  updateOrders,
}) => {
  const dispatch = useAppDispatch();

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
    console.log('sendToArchive');
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (order.order.id && token) {
      dispatch(archiveManufacturerOrderThunk({ orderId: order.order.id, isOrdersForManufacturer: true, token })).then(
        () => {
          updateOrders();
        }
      );
    }
  };

  const isArchivedOrder = getIsArchivedOrder(order);

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

      {!isArchivedOrder && (
        <ToolTip text={'Убрать заказ в архив'} customClass={classes.customTooltipArchive}>
          <img src={archiveIco} className={classes.archiveIco} alt="archiveIco" onClick={onClickSendToArchive} />
        </ToolTip>
      )}
    </div>
  );
};

export default ManOrderActions;
