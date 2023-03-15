import React from 'react';
import { OrderType } from '../../../../../../types/types';
import {
  getDeliveryTitle,
  getIsDeliveryMethodSelfPickUp,
  getIsOrderOnConfirming,
} from '../../../../../../utils/ordersFunctions';
import { formatUTCtoDDMMMMYYYY } from '../../../../../../utils/dateTimeFunctions';
import classes from './ManDetailsDeliveryConfirmation.module.css';
import CheckBoxSquare from '../../../../../../components/commonComponents/CheckBoxSquare/CheckBoxSquare';
import ToolTip from '../../../../../../components/commonComponents/ToolTip/ToolTip';

type PropsType = {
  order: OrderType;
  freeDelivery: boolean;
  setFreeDelivery: (value: boolean) => void;
};

const ManDetailsDeliveryConfirmation: React.FC<PropsType> = ({ order, freeDelivery, setFreeDelivery }) => {
  const isOrderOnConfirming = getIsOrderOnConfirming(order);
  const deliveryDate = formatUTCtoDDMMMMYYYY(order.order.deliveryDate);
  const deliveryTitle = getDeliveryTitle(order.order.deliveryMethod.title, order.order.deliveryPrice, true);
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

  return (
    <div className={classes.container}>
      <div className={classes.delimiter} />
      <div className={classes.sectionTile}>Доставка</div>
      <div className={classes.content}>
        <div className={classes.sectionDescription}>
          {`Покупатель запросил доставку товара, оцените стоимость  ваших услуг по доставке`}
        </div>
        <div className={classes.checkBoxContainer}>
          <CheckBoxSquare id={1} title={'Бесплатная'} checked={freeDelivery} onSelect={onClickSetFreeDelivery} />
          <CheckBoxSquare id={2} title={'Платная'} checked={!freeDelivery} onSelect={onClickSetPaidDelivery} />
          <div className={classes.priceContentContainer}>
            {!freeDelivery && (
              <>
                <div className={classes.priceTitle}>Укажите стоимость доставки товара в рублях</div>
                <div className={classes.priceInputContainer}>
                  <input className={classes.priceCustomSizeInput} value={123 || ''} onChange={() => {}} type="text" />
                  {/*<input className={classes.customSizeInput} value={price || ''} onChange={onChangeInput} type="text" />*/}
                  {'руб'}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/*<div className={classes.row}>*/}
      {/*  <div className={classes.title}>{'Дата поставки:'}</div>*/}
      {/*  <div className={classes.info}>{`${deliveryDate}`}</div>*/}
      {/*</div>*/}
      {/*<div className={classes.row}>*/}
      {/*  <div className={classes.title}>{'Способ поставки:'}</div>*/}
      {/*  <div className={classes.info}>{`${deliveryTitle}`}</div>*/}
      {/*</div>*/}
    </div>
  );
};

export default ManDetailsDeliveryConfirmation;
