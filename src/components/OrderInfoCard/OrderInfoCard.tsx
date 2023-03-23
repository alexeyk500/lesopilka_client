import React from 'react';
import classes from './OrderInfoCard.module.css';
import calendarIcoGray from '../../img/calendarIcoGray.svg';
import wareGrayHouseIco from '../../img/wareGrayHouseIco.svg';
import weightGrayIco from '../../img/weightGrayIco.svg';
import woodGrayIco from '../../img/woodGrayIco.svg';
import phoneGrayIco from '../../img/phoneGrayIco.svg';
import moneyGrayIco from '../../img/moneyGrayIco.svg';
import { ManufacturerType } from '../../types/types';
import DeliveryInfo from './DeliveryInfo/DeliveryInfo';
import OrderInfoSection from './OrderInfoSection/OrderInfoSection';
import PaymentMethodInfo from './PaymentMethodInfo/PaymentMethodInfo';
import { formatUTCtoDDMMMMYYYY } from '../../utils/dateTimeFunctions';

type PropsType = {
  date: string;
  contactPersonName?: string;
  contactPersonPhone?: string;
  manufacturer?: ManufacturerType;
  totalWeight?: string;
  totalVolume?: string;
  totalCost?: string;
};

const OrderInfoCard: React.FC<PropsType> = ({
  date,
  contactPersonName,
  contactPersonPhone,
  manufacturer,
  totalWeight,
  totalVolume,
  totalCost,
}) => {
  const formatDate = formatUTCtoDDMMMMYYYY(date);

  return (
    <div className={classes.container}>
      <OrderInfoSection
        ico={calendarIcoGray}
        title={'Дата доставки:'}
        infoFirstLine={formatDate}
        customIcoClasses={classes.calendarIco}
      />
      <OrderInfoSection
        ico={wareGrayHouseIco}
        title={'Поставщик:'}
        infoFirstLine={manufacturer?.title ?? ''}
        infoSecondLine={manufacturer?.address.location.title ?? ''}
        customIcoClasses={classes.downIco}
      />
      <OrderInfoSection
        ico={weightGrayIco}
        title={'Вес заказа:'}
        infoFirstLine={`${totalWeight} кг`}
        customIcoClasses={classes.downIco}
      />
      <OrderInfoSection
        ico={woodGrayIco}
        title={'Объем заказа:'}
        infoFirstLine={`${totalVolume} м.куб.`}
        customIcoClasses={classes.downIco}
      />
      <DeliveryInfo />
      <OrderInfoSection
        ico={phoneGrayIco}
        title={'Контактное лицо:'}
        infoFirstLine={contactPersonPhone || ''}
        infoSecondLine={contactPersonName || ''}
        customIcoClasses={classes.downIco}
        customContainerClasses={classes.customContainer}
      />
      <PaymentMethodInfo />
      <OrderInfoSection
        ico={moneyGrayIco}
        title={'Сумма заказа:'}
        infoFirstLine={`${totalCost} руб.`}
        customIcoClasses={classes.downIco}
      />
    </div>
  );
};

export default OrderInfoCard;
