import React from 'react';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import CheckBoxBlueSquare from '../../../../components/commonComponents/CheckBoxBlueSquare/CheckBoxBlueSquare';
import classes from './DeliverySection.module.css';
import SearchLocationSelector from '../../../../components/commonComponents/SearchLocationSelector/SearchLocationSelector';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorBasketProducts } from '../../../../store/basketSlice';
import { filterProductsByManufacturerId } from '../../../../utils/productFunctions';
import { getFullManufacturerAddress } from '../../../../utils/functions';
import { DeliveryMethodEnum } from '../../../../types/types';
import { selectorNewOrderDeliveryMethod, setDeliveryMethod } from '../../../../store/newOrderSlice';

const DeliverySection: React.FC = () => {
  const { mid } = useParams();
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector(selectorBasketProducts);
  const deliveryMethod = useAppSelector(selectorNewOrderDeliveryMethod);
  const productsByManufacturerId = filterProductsByManufacturerId(basketProducts, Number(mid) ?? 0);
  const manufacturer = productsByManufacturerId?.[0]?.manufacturer;
  const fullManufacturerAddress = getFullManufacturerAddress(manufacturer);

  const onSelectDeliveryMethod = (id: number | string) => {
    dispatch(setDeliveryMethod(id as DeliveryMethodEnum));
  };

  return (
    <SectionContainer title={'Способ доставки'} completeCondition={false}>
      <div className={classes.checkBoxContainer}>
        <CheckBoxBlueSquare
          id={DeliveryMethodEnum.pickup}
          title={DeliveryMethodEnum.pickup}
          checked={deliveryMethod === DeliveryMethodEnum.pickup}
          onSelect={onSelectDeliveryMethod}
        />
        <div className={classes.pickUpAddressContainer}>
          <div className={classes.pickUpAddressTitle}>{fullManufacturerAddress}</div>
        </div>
      </div>
      <div className={classes.checkBoxDeliveryContainer}>
        <CheckBoxBlueSquare
          id={DeliveryMethodEnum.delivery}
          title={DeliveryMethodEnum.delivery}
          checked={deliveryMethod === DeliveryMethodEnum.delivery}
          onSelect={onSelectDeliveryMethod}
          additionalInfo={
            'За организацию доставки поставщик может брать дополнительную плату, ' +
            'если доставка платная, то ее стоимость поставщик укажет в счете на заказ.'
          }
        />
        {deliveryMethod === DeliveryMethodEnum.delivery && (
          <div className={classes.rowContainer}>
            <div className={classes.locationSelectorContainer}>
              <SearchLocationSelector />
            </div>
            <div className={classes.contentContainer}>
              <div className={classes.title}>{'Укажите Ваш точный адрес для доставки'}</div>
              <input className={classes.customSizeInput} placeholder={'Улица, дом'} onChange={() => {}} type="text" />
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default DeliverySection;
