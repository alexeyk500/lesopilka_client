import React from 'react';
import classes from './OrderItemTableTile.module.css';

type PropsType = {
  isManufacturer?: boolean;
};

const OrderItemTableTile: React.FC<PropsType> = ({ isManufacturer }) => {
  return (
    <div className={classes.tableTitle}>
      <div className={classes.tableColumnDate}>{'Поставка'}</div>
      <div className={classes.tableColumnNumber}>{'Номер'}</div>
      <div className={classes.tableColumnManufacturer}>{isManufacturer ? 'Покупатель' : 'Поставщик'}</div>
      <div className={classes.tableColumnWeight}>{'Вес'}</div>
      <div className={classes.tableColumnVolume}>{'Обьем'}</div>
      <div className={classes.tableColumnCost}>{'Стоимость'}</div>
      <div className={classes.tableColumnDelivery}>{'Доставка'}</div>
      <div className={classes.tableColumnActions}>{'Действия'}</div>
      <div className={classes.tableColumnStatus}>{'Статус'}</div>
    </div>
  );
};

export default OrderItemTableTile;
