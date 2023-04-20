import React from 'react';
import { ManufacturerType } from '../../../../../types/types';
import classes from './DetailReportResellerManufacturersListItem.module.css';
import ViewManufacturerBtn from '../../../../ResellerCabinetPage/ResellerCabinetMain/ResellerManufacturersList/ResellerManufacturerListItem/ResellerManufacturerActions/ViewManufacturerBtn/ViewManufacturerBtn';

type PropsType = {
  ind: number;
  resellerManufacturer: ManufacturerType;
};

const DetailReportResellerManufacturersListItem: React.FC<PropsType> = ({ ind, resellerManufacturer }) => {
  return (
    <div className={classes.container}>
      <div className={classes.tableTitle}>
        <div className={classes.tableColumnNumber}>{ind + 1}</div>
        <div className={classes.tableColumnManufacturer}>{resellerManufacturer.title}</div>
        <div className={classes.tableColumnLocation}>{resellerManufacturer.address.location.title}</div>
        <div className={classes.tableColumnPublications}>{resellerManufacturer.activeCards}</div>
        <div className={classes.tableColumnActions}>
          <ViewManufacturerBtn manufacturer={resellerManufacturer} />
        </div>
      </div>
    </div>
  );
};

export default DetailReportResellerManufacturersListItem;
