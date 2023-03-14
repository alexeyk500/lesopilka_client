import React from 'react';
import classes from './ManDetailsHeaderRightColumn.module.css';
import { formatUTCtoDDMMMMYYYY } from '../../../../../../../utils/dateTimeFunctions';
import ButtonComponent, {
  ButtonType,
} from '../../../../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { AmountTypeEnum, OrderType } from '../../../../../../../types/types';
import {
  getIsArchivedOrder,
  getIsOrderCanceledByUser,
  getIsOrderCanceledManufacturer,
} from '../../../../../../../utils/ordersFunctions';

const getShowRightColumn = (infoTab: AmountTypeEnum) => {
  return infoTab === AmountTypeEnum.inConfirmation || infoTab === AmountTypeEnum.inOrder;
};

type PropsType = {
  order: OrderType;
  infoTab: AmountTypeEnum;
  onConfirmClick: () => void;
  onRejectClick: () => void;
};

const ManDetailsHeaderRightColumn: React.FC<PropsType> = ({ order, infoTab, onConfirmClick, onRejectClick }) => {
  const isShowRightColumn = getShowRightColumn(infoTab);
  const isConfirmedOrder = !!order.order.manufacturerConfirmedDate;
  const isArchivedOrder = getIsArchivedOrder(order);
  const isOrderCanceledManufacturer = getIsOrderCanceledManufacturer(order);
  const isOrderCanceledByUser = getIsOrderCanceledByUser(order);

  return (
    <div className={classes.container}>
      {isShowRightColumn ? (
        isConfirmedOrder ? (
          <>
            <div className={classes.confirmedOrderTitle}>
              {`Заказ подтвержден\n${formatUTCtoDDMMMMYYYY(order.order.manufacturerConfirmedDate)}`}
            </div>
            {isOrderCanceledByUser && (
              <div className={classes.canceledByUserTitle}>{`\nно клиент отказался\nот заказа`}</div>
            )}
          </>
        ) : isArchivedOrder ? (
          <div className={classes.archivedOrderTitle}>{`Срок подтверждения\nзаказа истек`}</div>
        ) : isOrderCanceledManufacturer ? (
          <div className={classes.canceledManufacturerTitle}>{`Вы отказались\nот заказа`}</div>
        ) : isOrderCanceledByUser ? (
          <div className={classes.canceledByUserTitle}>{`Клиент отказался\nот заказа`}</div>
        ) : (
          <>
            {infoTab === AmountTypeEnum.inConfirmation && (
              <div className={classes.confirmButtonContainer}>
                <ButtonComponent
                  buttonType={ButtonType.GREEN}
                  title={'Подтвердить'}
                  style={{ width: '155px' }}
                  onClick={onConfirmClick}
                />
              </div>
            )}
            <ButtonComponent buttonType={ButtonType.RED} title={'Отказаться'} onClick={onRejectClick} />
          </>
        )
      ) : null}
    </div>
  );
};

export default ManDetailsHeaderRightColumn;
