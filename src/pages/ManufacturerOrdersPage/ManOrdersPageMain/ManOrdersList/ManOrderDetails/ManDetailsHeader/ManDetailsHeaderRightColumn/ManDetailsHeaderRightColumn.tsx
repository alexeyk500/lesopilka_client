import React from 'react';
import classes from './ManDetailsHeaderRightColumn.module.css';
import { formatUTCtoDDMMMMYYYY } from '../../../../../../../utils/dateTimeFunctions';
import ButtonComponent, {
  ButtonType,
} from '../../../../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { AmountTypeEnum, OrderStatusEnum, OrderType } from '../../../../../../../types/types';

const getShowRightColumn = (infoTab: AmountTypeEnum) => {
  return infoTab === AmountTypeEnum.inConfirmation || infoTab === AmountTypeEnum.inOrder;
};

type PropsType = {
  order: OrderType;
  infoTab: AmountTypeEnum;
};

const ManDetailsHeaderRightColumn: React.FC<PropsType> = ({ order, infoTab }) => {
  const isShowRightColumn = getShowRightColumn(infoTab);
  const isConfirmedOrder = !!order.order.manufacturerConfirmedDate;
  const isArchivedOrder =
    order.order.status ===
    Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(OrderStatusEnum.inArchive)];

  return isShowRightColumn ? (
    <div className={classes.container}>
      {isConfirmedOrder ? (
        <div className={classes.confirmedOrderTitle}>{`Заказ подтвержден\n${formatUTCtoDDMMMMYYYY(
          order.order.manufacturerConfirmedDate
        )}`}</div>
      ) : isArchivedOrder ? (
        <div className={classes.archivedOrderTitle}>{`Срок подтверждения\nзаказа истек`}</div>
      ) : (
        <>
          <div className={classes.confirmButtonContainer}>
            <ButtonComponent buttonType={ButtonType.GREEN} title={'Подтвердить'} style={{ width: '155px' }} />
          </div>
          <ButtonComponent buttonType={ButtonType.RED} title={'Отказаться'} />
        </>
      )}
    </div>
  ) : null;
};

export default ManDetailsHeaderRightColumn;
