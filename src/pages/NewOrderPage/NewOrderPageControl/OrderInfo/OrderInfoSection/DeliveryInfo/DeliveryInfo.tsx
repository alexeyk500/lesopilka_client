import React from 'react';
import { DeliveryMethodEnum } from '../../../../../../types/types';
import OrderInfoSection from '../OrderInfoSection';
import locationGrayIco from '../../../../../../img/locationGrayIco.svg';
import classes from '../../OrderInfo.module.css';
import { getShortManufacturerTwoLineAddress } from '../../../../../../utils/functions';
import { useAppSelector } from '../../../../../../hooks/hooks';
import {
  selectorNewOrderDeliveryAddress,
  selectorNewOrderDeliveryLocation,
  selectorNewOrderDeliveryMethod,
} from '../../../../../../store/newOrderSlice';
import { useParams } from 'react-router-dom';
import { filterProductsByManufacturerId } from '../../../../../../utils/productFunctions';
import { selectorBasketProducts } from '../../../../../../store/basketSlice';
import truckGrayIco from '../../../../../../img/truckGrayIco.svg';

const DeliveryInfo: React.FC = () => {
  const { mid } = useParams();
  const basketProducts = useAppSelector(selectorBasketProducts);
  const productsByManufacturerId = filterProductsByManufacturerId(basketProducts, Number(mid) ?? 0);
  const deliveryMethod = useAppSelector(selectorNewOrderDeliveryMethod);
  const deliveryLocation = useAppSelector(selectorNewOrderDeliveryLocation);
  const deliveryAddress = useAppSelector(selectorNewOrderDeliveryAddress);

  const manufacturer = productsByManufacturerId?.[0]?.manufacturer;

  return (
    <>
      <OrderInfoSection
        ico={truckGrayIco}
        title={'Способ доставки:'}
        infoFirstLine={deliveryMethod}
        customIcoClasses={classes.calendarIco}
      />
      {deliveryMethod === DeliveryMethodEnum.delivery ? (
        <OrderInfoSection
          ico={locationGrayIco}
          title={'Адрес доставки:'}
          infoFirstLine={deliveryLocation ? deliveryLocation.title : ''}
          infoSecondLine={deliveryAddress}
          customIcoClasses={classes.downIco}
        />
      ) : (
        <OrderInfoSection
          ico={locationGrayIco}
          title={'Адрес самовывоза:'}
          infoFirstLine={getShortManufacturerTwoLineAddress(manufacturer)[0]}
          infoSecondLine={getShortManufacturerTwoLineAddress(manufacturer)[1]}
          customIcoClasses={classes.downIco}
        />
      )}
    </>
  );
};

export default DeliveryInfo;
