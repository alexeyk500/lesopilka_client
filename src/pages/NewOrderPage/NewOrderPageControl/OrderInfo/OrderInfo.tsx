import React from 'react';
import classes from './OrderInfo.module.css';
import OrderInfoSection from './OrderInfoSection/OrderInfoSection';

import calendarIcoGray from '../../../../img/calendarIcoGray.svg';
import phoneGrayIco from '../../../../img/phoneGrayIco.svg';
import wareGrayHouseIco from '../../../../img/wareGrayHouseIco.svg';
import weightGrayIco from '../../../../img/weightGrayIco.svg';
import woodGrayIco from '../../../../img/woodGrayIco.svg';
import moneyGrayIco from '../../../../img/moneyGrayIco.svg';
import { getTotalLogisticInfo } from '../../../../utils/functions';
import { useAppSelector } from '../../../../hooks/hooks';
import {
  selectorNewOrderContactPersonName,
  selectorNewOrderContactPersonPhone,
  selectorNewOrderDate,
} from '../../../../store/newOrderSlice';
import { selectorBasketProducts } from '../../../../store/basketSlice';
import { useParams } from 'react-router-dom';
import { filterProductsByManufacturerId } from '../../../../utils/productFunctions';
import PaymentMethodInfo from './OrderInfoSection/PaymentMethodInfo/PaymentMethodInfo';
import DeliveryInfo from './OrderInfoSection/DeliveryInfo/DeliveryInfo';
import { formatUTCtoDDMMMMYYYY } from '../../../../utils/dateTimeFunctions';

const OrderInfo: React.FC = () => {
  const { mid } = useParams();
  const basketProducts = useAppSelector(selectorBasketProducts);
  const date = formatUTCtoDDMMMMYYYY(useAppSelector(selectorNewOrderDate));
  const contactPersonName = useAppSelector(selectorNewOrderContactPersonName);
  const contactPersonPhone = useAppSelector(selectorNewOrderContactPersonPhone);
  const productsByManufacturerId = filterProductsByManufacturerId(basketProducts, Number(mid) ?? 0);
  const manufacturer = productsByManufacturerId?.[0]?.manufacturer;
  const { totalWeight, totalVolume, totalCost } = getTotalLogisticInfo(productsByManufacturerId);

  return (
    <div className={classes.container}>
      <OrderInfoSection
        ico={calendarIcoGray}
        title={'Дата доставки:'}
        infoFirstLine={date}
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

export default OrderInfo;
