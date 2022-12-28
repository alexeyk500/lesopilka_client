import React from 'react';
import classes from './OrderInfo.module.css';
import OrderInfoSection from './OrderInfoSection/OrderInfoSection';

import calendarIcoGray from '../../../../img/calendarIcoGray.svg';
import truckGrayIco from '../../../../img/truckGrayIco.svg';
import phoneGrayIco from '../../../../img/phoneGrayIco.svg';
import wareGrayHouseIco from '../../../../img/wareGrayHouseIco.svg';
import weightGrayIco from '../../../../img/weightGrayIco.svg';
import woodGrayIco from '../../../../img/woodGrayIco.svg';
import cashMachineGrayIco from '../../../../img/cashMachineGrayIco.svg';
import moneyGrayIco from '../../../../img/moneyGrayIco.svg';
import locationGrayIco from '../../../../img/locationGrayIco.svg';
import { formatUTCtoDDMMMMYYYY, getTotalLogisticInfo } from '../../../../utils/functions';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorNewOrderDate } from '../../../../store/newOrderSlice';
import { selectorBasketProducts } from '../../../../store/basketSlice';
import { useParams } from 'react-router-dom';
import { filterProductsByManufacturerId } from '../../../../utils/productFunctions';

const OrderInfo: React.FC = () => {
  const { mid } = useParams();
  const basketProducts = useAppSelector(selectorBasketProducts);
  const date = formatUTCtoDDMMMMYYYY(useAppSelector(selectorNewOrderDate));
  const productsByManufacturerId = filterProductsByManufacturerId(basketProducts, Number(mid) ?? 0);
  const manufacturer = productsByManufacturerId?.[0]?.manufacturer;
  const { totalWeight, totalVolume, totalSumm } = getTotalLogisticInfo(productsByManufacturerId);

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
      <OrderInfoSection
        ico={truckGrayIco}
        title={'Способ доставки:'}
        infoFirstLine={'Самовывоз'}
        customIcoClasses={classes.calendarIco}
      />
      <OrderInfoSection
        ico={locationGrayIco}
        title={'Адрес доставки:'}
        infoFirstLine={'г.Самара,'}
        infoSecondLine={'ул.Ленина, д.23'}
        customIcoClasses={classes.downIco}
      />
      <OrderInfoSection
        ico={phoneGrayIco}
        title={'Контактное лицо:'}
        infoFirstLine={'Петров Анатолий'}
        infoSecondLine={'+79219843567'}
        customIcoClasses={classes.downIco}
      />
      <OrderInfoSection
        ico={cashMachineGrayIco}
        title={'Способ оплаты:'}
        infoFirstLine={'Наличными'}
        infoSecondLine={'- при самовывозе'}
        customIcoClasses={classes.downIco}
      />
      <OrderInfoSection
        ico={moneyGrayIco}
        title={'Сумма заказа:'}
        infoFirstLine={`${totalSumm} руб.`}
        customIcoClasses={classes.downIco}
      />
    </div>
  );
};

export default OrderInfo;
