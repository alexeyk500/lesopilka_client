import React from 'react';
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
import { AmountTypeEnum } from '../../../../types/types';
import OrderInfoCard from '../../../../components/OrderInfoCard/OrderInfoCard';

const NewOrderInfo: React.FC = () => {
  const { mid } = useParams();
  const basketProducts = useAppSelector(selectorBasketProducts);
  const date = useAppSelector(selectorNewOrderDate);
  const contactPersonName = useAppSelector(selectorNewOrderContactPersonName);
  const contactPersonPhone = useAppSelector(selectorNewOrderContactPersonPhone);
  const productsByManufacturerId = filterProductsByManufacturerId(basketProducts, Number(mid) ?? 0);
  const manufacturer = productsByManufacturerId?.[0]?.manufacturer;
  const { totalWeight, totalVolume, totalCost } = getTotalLogisticInfo(
    productsByManufacturerId,
    AmountTypeEnum.inBasket
  );

  return (
    <OrderInfoCard
      date={date}
      contactPersonName={contactPersonName}
      contactPersonPhone={contactPersonPhone}
      manufacturer={manufacturer}
      totalWeight={totalWeight}
      totalVolume={totalVolume}
      totalCost={totalCost}
    />
  );
};

export default NewOrderInfo;
