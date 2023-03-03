import React from 'react';
import classes from './ManOrdersList.module.css';

const ManOrdersList: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.tableTitle}>
        <div className={classes.tableColumnDate}>{'Поставка'}</div>
        <div className={classes.tableColumnNumber}>{'Номер'}</div>
        <div className={classes.tableColumnManufacturer}>{'Покупатель'}</div>
        <div className={classes.tableColumnWeight}>{'Вес'}</div>
        <div className={classes.tableColumnVolume}>{'Обьем'}</div>
        <div className={classes.tableColumnCost}>{'Стоимость'}</div>
        <div className={classes.tableColumnDelivery}>{'Доставка'}</div>
        <div className={classes.tableColumnActions}>{'Действия'}</div>
        <div className={classes.tableColumnStatus}>{'Статус'}</div>
      </div>
      <div className={classes.scrollContainer}>scrollContainer</div>
    </div>
  );
};

export default ManOrdersList;
