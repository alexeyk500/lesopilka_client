import React from 'react';
import { OrderType } from '../../../../../../types/types';
import { getIsDeliveryMethodSelfPickUp, getIsOrderOnConfirming } from '../../../../../../utils/ordersFunctions';
import classes from './ManDetailsDeliveryConfirmation.module.css';
import CheckBoxSquare from '../../../../../../components/commonComponents/CheckBoxSquare/CheckBoxSquare';
import { regExpForPrice } from '../../../../../../utils/constants';

type PropsType = {
  order: OrderType;
  freeDelivery: boolean;
  setFreeDelivery: (value: boolean) => void;
  confirmedDeliveryPrice: number | null;
  setConfirmedDeliveryPrice: (value: number | null) => void;
};

const ManDetailsDeliveryConfirmation: React.FC<PropsType> = ({
  order,
  freeDelivery,
  setFreeDelivery,
  confirmedDeliveryPrice,
  setConfirmedDeliveryPrice,
}) => {
  const isOrderOnConfirming = getIsOrderOnConfirming(order);
  const isDeliveryMethodSelfPickUp = getIsDeliveryMethodSelfPickUp(order);

  if (!isOrderOnConfirming || isDeliveryMethodSelfPickUp) {
    return null;
  }

  const onClickSetFreeDelivery = () => {
    setFreeDelivery(true);
  };

  const onClickSetPaidDelivery = () => {
    setFreeDelivery(false);
  };

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newPrice = event.currentTarget.value ? event.currentTarget.value : undefined;
    if (newPrice) {
      if (regExpForPrice.test(newPrice) && Number(newPrice)) {
        setConfirmedDeliveryPrice(Number(newPrice));
      }
    } else {
      setConfirmedDeliveryPrice(null);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.delimiter} />
      <div className={classes.sectionTile}>Доставка</div>
      <div className={classes.content}>
        <div className={classes.sectionDescription}>
          {`покупатель запросил доставку товара, оцените стоимость  ваших услуг по доставке`}
        </div>
        <div className={classes.checkBoxContainer}>
          <CheckBoxSquare id={1} title={'Бесплатная'} checked={freeDelivery} onSelect={onClickSetFreeDelivery} />
          <CheckBoxSquare id={2} title={'Платная'} checked={!freeDelivery} onSelect={onClickSetPaidDelivery} />
          <div className={classes.priceContentContainer}>
            {!freeDelivery && (
              <>
                <div className={classes.priceTitle}>Укажите стоимость доставки товара в рублях</div>
                <div className={classes.priceInputContainer}>
                  <input
                    className={classes.priceCustomSizeInput}
                    value={confirmedDeliveryPrice || ''}
                    onChange={onChangeInput}
                    type="text"
                  />
                  {'руб'}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManDetailsDeliveryConfirmation;
