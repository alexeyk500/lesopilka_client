import React from 'react';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import CheckBoxBlueSquare from '../../../../components/commonComponents/CheckBoxBlueSquare/CheckBoxBlueSquare';
import classes from './DeliverySection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {getFullStringAddress} from '../../../../utils/functions';
import { DeliveryMethodEnum, OptionsType } from '../../../../types/types';
import {
  selectorNewOrderDeliveryAddress,
  selectorNewOrderDeliveryLocation,
  selectorNewOrderDeliveryMethod,
  selectorNewOrderDeliveryMethods,
  selectorNewOrderManufacturerPickUpAddress,
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
  const dispatch = useAppDispatch();
  const deliveryMethods = useAppSelector(selectorNewOrderDeliveryMethods);
  const deliveryMethod = useAppSelector(selectorNewOrderDeliveryMethod);
  const deliveryLocation = useAppSelector(selectorNewOrderDeliveryLocation);
  const deliveryAddress = useAppSelector(selectorNewOrderDeliveryAddress);
  const manufacturerPickUpAddress = getFullStringAddress(useAppSelector(selectorNewOrderManufacturerPickUpAddress));

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
      {deliveryMethods.map((deliveryMethodItem) => {
        if ((deliveryMethodItem.title as DeliveryMethodEnum) === DeliveryMethodEnum.pickup) {
          return (
            <div className={classes.checkBoxContainer} key={deliveryMethodItem.title}>
              {manufacturerPickUpAddress ? (
                <>
                  <CheckBoxBlueSquare
                    id={DeliveryMethodEnum.pickup}
                    title={DeliveryMethodEnum.pickup}
                    checked={deliveryMethod === DeliveryMethodEnum.pickup}
                    onSelect={onSelectDeliveryMethod}
                  />
                  <div className={classes.pickUpAddressContainer}>
                    <div className={classes.pickUpAddressTitle}>{manufacturerPickUpAddress}</div>
                  </div>
                </>
              ) : (
                <>
                  <CheckBoxBlueSquare
                    id={DeliveryMethodEnum.pickup}
                    title={DeliveryMethodEnum.pickup}
                    checked={false}
                    onSelect={() => {}}
                    disabled
                  />
                  <div className={classes.pickUpAddressContainer}>
                    <div className={classes.pickUpAddressTitle}>
                      {'- производитель не указал, возможность самовывоза товара со своего склада.'}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        } else if ((deliveryMethodItem.title as DeliveryMethodEnum) === DeliveryMethodEnum.delivery) {
          return (
            <div className={classes.checkBoxDeliveryContainer} key={deliveryMethodItem.title}>
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
          );
        }
        return null
      })}
    </SectionContainer>
  );
};

export default DeliverySection;
