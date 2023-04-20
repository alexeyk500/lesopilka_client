import React from 'react';
import { ManufacturerType } from '../../../../types/types';
import classes from './DetailReportResellerManufacturersList.module.css';
import DetailReportResellerManufacturersListItem from './DetailReportResellerManufacturersListItem/DetailReportResellerManufacturersListItem';

type PropsType = {
  resellerManufacturers: ManufacturerType[];
};

const DetailReportResellerManufacturersList: React.FC<PropsType> = ({ resellerManufacturers }) => {
  return (
    <div className={classes.container}>
      <div className={classes.tableTitle}>
        <div className={classes.tableColumnNumber}>{'№'}</div>
        <div className={classes.tableColumnManufacturer}>{'Поставщик'}</div>
        <div className={classes.tableColumnLocation}>{'Локация'}</div>
        <div className={classes.tableColumnPublications}>{'Публикации'}</div>
        <div className={classes.tableColumnActions}>{'Действия'}</div>
      </div>
      <div className={classes.scrollContainer}>
        {resellerManufacturers.map((resellerManufacturer, ind) => (
          <DetailReportResellerManufacturersListItem key={ind} ind={ind} resellerManufacturer={resellerManufacturer} />
        ))}
      </div>
    </div>
  );
};

export default DetailReportResellerManufacturersList;
