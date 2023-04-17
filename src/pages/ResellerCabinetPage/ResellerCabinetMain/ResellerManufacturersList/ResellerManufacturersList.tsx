import React from 'react';
import classes from './ResellerManufacturersList.module.css';
import { ManufacturerType } from '../../../../types/types';
import ResellerManufacturerListItem from './ResellerManufacturerListItem/ResellerManufacturerListItem';

type PropsType = {
  manufacturers: ManufacturerType[];
};

const ResellerManufacturersList: React.FC<PropsType> = ({ manufacturers }) => {
  return (
    <div className={classes.container}>
      <div className={classes.tableTitle}>
        <div className={classes.tableColumnManufacturer}>{'Поставщик'}</div>
        <div className={classes.tableColumnLocation}>{'Локация'}</div>
        <div className={classes.tableColumnPublications}>{'Публикации'}</div>
        <div className={classes.tableColumnLicenses}>{'Лицензии'}</div>
        <div className={classes.tableColumnForecast}>{'Прогноз'}</div>
        <div className={classes.tableColumnActions}>{'Действия'}</div>
        <div className={classes.tableColumnStatus}>{'Статус'}</div>
      </div>
      <div className={classes.scrollContainer}>
        {manufacturers.map((manufacturer) => (
          <ResellerManufacturerListItem key={manufacturer.id} manufacturer={manufacturer} />
        ))}
      </div>
    </div>
  );
};

export default ResellerManufacturersList;
