import React from 'react';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import CheckBoxBlueSquare from '../../../../components/commonComponents/CheckBoxBlueSquare/CheckBoxBlueSquare';
import classes from './DeliverySection.module.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorBasketProducts } from '../../../../store/basketSlice';
import { filterProductsByManufacturerId } from '../../../../utils/productFunctions';
import { getFullManufacturerAddress } from '../../../../utils/functions';
import { DeliveryMethodEnum, OptionsType } from '../../../../types/types';
import {
  selectorNewOrderDeliveryAddress,
  selectorNewOrderDeliveryLocation,
  selectorNewOrderDeliveryMethod,
  setDeliveryAddress,
  setDeliveryLocation,
  setDeliveryMethod,
} from '../../../../store/newOrderSlice';
import PlaceSelector from '../../../../components/PlaceSelector/PlaceSelector';

export const checkDeliverySection = (
  deliveryMethod: DeliveryMethodEnum,
  deliveryLocationId: OptionsType | undefined,
  deliveryAddress: string | undefined
) => {
  if (deliveryMethod === DeliveryMethodEnum.pickup) {
    return true;
  } else {
    if (deliveryLocationId && deliveryAddress) {
      return true;
    }
  }
  return false;
};

const DeliverySection: React.FC = () => {
  const { mid } = useParams();
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector(selectorBasketProducts);
  const deliveryMethod = useAppSelector(selectorNewOrderDeliveryMethod);
  const deliveryLocation = useAppSelector(selectorNewOrderDeliveryLocation);
  const deliveryAddress = useAppSelector(selectorNewOrderDeliveryAddress);

  const productsByManufacturerId = filterProductsByManufacturerId(basketProducts, Number(mid) ?? 0);
  const manufacturer = productsByManufacturerId?.[0]?.manufacturer;
  const fullManufacturerAddress = getFullManufacturerAddress(manufacturer);
  const isSectionCondition = checkDeliverySection(deliveryMethod, deliveryLocation, deliveryAddress);

  const onSelectDeliveryMethod = (id: number | string) => {
    dispatch(setDeliveryMethod(id as DeliveryMethodEnum));
  };

  const onSelectLocation = (option: OptionsType | undefined) => {
    dispatch(setDeliveryLocation(option));
  };

  const onChangeDeliveryAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDeliveryAddress(event.currentTarget.value === '' ? undefined : event.currentTarget.value));
  };

  return (
    <SectionContainer title={'Способ доставки'} completeCondition={isSectionCondition}>
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
              <PlaceSelector onSelectLocation={onSelectLocation} />
            </div>
            <div className={classes.contentContainer}>
              <div className={classes.title}>{'Укажите Ваш точный адрес для доставки'}</div>
              <input
                className={classes.customSizeInput}
                placeholder={'Улица, дом'}
                value={deliveryAddress || ''}
                onChange={onChangeDeliveryAddress}
                type="text"
              />
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default DeliverySection;
