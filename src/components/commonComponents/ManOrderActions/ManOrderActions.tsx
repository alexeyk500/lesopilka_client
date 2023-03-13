import React from 'react';
import classes from './ManOrderActions.module.css';
import viewIco from '../../../img/visibilityIcoOn.svg';
import viewCloseIco from '../../../img/visibilityIcoOff.svg';
import chatIco from '../../../img/chatIco.svg';
import chatIcoOff from '../../../img/chatIcoOff.svg';
import archiveIco from '../../../img/archiveIco.svg';
import { OrderType } from '../../../types/types';

import ToolTip from '../ToolTip/ToolTip';

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
  const sendToArchive = () => {
    console.log('sendToArchive');
  };

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

      <ToolTip text={'Убрать заказ в архив'} customClass={classes.customTooltipArchive}>
        <img src={archiveIco} className={classes.archiveIco} alt="archiveIco" onClick={sendToArchive} />
      </ToolTip>
    </div>
  );
};

export default ManOrderActions;
