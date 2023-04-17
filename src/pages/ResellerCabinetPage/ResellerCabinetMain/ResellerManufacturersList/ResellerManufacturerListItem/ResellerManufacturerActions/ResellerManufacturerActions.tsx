import React from 'react';
import classes from './ResellerManufacturerActions.module.css';
import ViewManufacturerBtn from './ViewManufacturerBtn/ViewManufacturerBtn';
import SendEmailBtn from './SendEmailBtn/SendEmailBtn';
import UnsubscribeManufacturerBtn from './UnsubscribeManufacturerBtn/UnsubscribeManufacturerBtn';
import { ManufacturerType } from '../../../../../../types/types';

type PropsType = {
  manufacturer: ManufacturerType;
};

const ResellerManufacturerActions: React.FC<PropsType> = ({ manufacturer }) => {
  return (
    <div className={classes.container}>
      <ViewManufacturerBtn manufacturer={manufacturer} />
      <SendEmailBtn manufacturer={manufacturer} />
      <UnsubscribeManufacturerBtn manufacturer={manufacturer} />
    </div>
  );
};

export default ResellerManufacturerActions;
