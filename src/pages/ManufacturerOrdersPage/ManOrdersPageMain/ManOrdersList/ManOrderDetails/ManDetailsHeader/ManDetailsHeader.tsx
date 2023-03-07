import React from 'react';
import classes from './ManDetailsHeader.module.css';
import { AmountTypeEnum, DeliveryMethodEnum, OrderStatusEnum, OrderType } from '../../../../../../types/types';
import { getDeliveryTitle, getOrderDetailHeader } from '../../../../../../utils/ordersFunctions';
import { formatUTCtoDDMMMMYYYY } from '../../../../../../utils/dateTimeFunctions';
import { getPaymentMethodTitle } from '../../../../../NewOrderPage/NewOrderPageMainPart/PaymentMethodSection/PaymentMethodSection';
import ButtonComponent, {
  ButtonType,
} from '../../../../../../components/commonComponents/ButtonComponent/ButtonComponent';

const getShowRightColumn = (infoTab: AmountTypeEnum) => {
  return infoTab === AmountTypeEnum.inConfirmation || infoTab === AmountTypeEnum.inOrder;
};

type PropsType = {
  order: OrderType;
  infoTab: AmountTypeEnum;
};

const ManDetailsHeader: React.FC<PropsType> = ({ order, infoTab }) => {
  const deliveryDate = formatUTCtoDDMMMMYYYY(order.order.deliveryDate);
  const deliveryTitle = getDeliveryTitle(order.order.deliveryMethod.title, order.order.deliveryPrice, true);
  const paymentMethodTitle = getPaymentMethodTitle(
    order.order.deliveryMethod.title as DeliveryMethodEnum,
    order.order.paymentMethod.title
  );
  const contactPersonName = order.order.contactPersonName;
  const contactPersonPhone = order.order.contactPersonPhone;
  const isConfirmedOrder = !!order.order.manufacturerConfirmedDate;

  const isArchivedOrder =
    order.order.status ===
    Object.keys(OrderStatusEnum)[Object.values(OrderStatusEnum).indexOf(OrderStatusEnum.inArchive)];

  const orderDetailsHeader = getOrderDetailHeader({
    orderId: order.order.id,
    date: deliveryDate,
    infoTab,
  });

  const isShowRightColumn = getShowRightColumn(infoTab);

  console.log('infoTab =', infoTab, order.order.status, isArchivedOrder, OrderStatusEnum.inArchive);

  return (
    <div className={classes.container}>
      <div className={classes.leftColumn}>
        <div className={classes.titleRow}>{orderDetailsHeader}</div>
        <div className={classes.row}>
          <div className={classes.title}>{'Покупатель:'}</div>
          <div className={classes.info}>
            {`${order.order.userInfo?.name},`}
            &nbsp;&nbsp;
            {`${order.order.userInfo?.email}`}
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>{'Дата поставки:'}</div>
          <div className={classes.info}>{`${deliveryDate}`}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>{'Способ поставки:'}</div>
          <div className={classes.info}>{`${deliveryTitle}`}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>{'Способ оплаты:'}</div>
          <div className={classes.info}>{`${paymentMethodTitle}`}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.title}>{'Контактное лицо:'}</div>
          <div className={classes.info}>
            {`${contactPersonName},`}
            &nbsp;&nbsp;
            {`${contactPersonPhone},`}
          </div>
        </div>
      </div>
      {isShowRightColumn && (
        <div className={classes.rightColumn}>
          {isArchivedOrder ? (
            <div className={classes.archivedOrderTitle}>{`Заказ в Архиве\n\nподробности\nв переписке`}</div>
          ) : isConfirmedOrder ? (
            <div className={classes.confirmedOrderTitle}>{`Заказ подтвержден\n${formatUTCtoDDMMMMYYYY(
              order.order.manufacturerConfirmedDate
            )}`}</div>
          ) : (
            <>
              <div className={classes.confirmButtonContainer}>
                <ButtonComponent buttonType={ButtonType.GREEN} title={'Подтвердить'} style={{ width: '155px' }} />
              </div>
              <ButtonComponent buttonType={ButtonType.RED} title={'Отказаться'} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ManDetailsHeader;
