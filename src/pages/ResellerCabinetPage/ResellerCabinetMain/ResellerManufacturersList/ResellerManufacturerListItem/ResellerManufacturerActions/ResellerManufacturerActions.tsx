import React from 'react';
import classes from './ResellerManufacturerActions.module.css';
import ViewManufacturerBtn from './ViewManufacturerBtn/ViewManufacturerBtn';
import SendEmailBtn from './SendEmailBtn/SendEmailBtn';
import UnsubscribeManufacturerBtn from './UnsubscribeManufacturerBtn/UnsubscribeManufacturerBtn';

const ResellerManufacturerActions: React.FC = () => {
  return (
    <div className={classes.container}>
      <ViewManufacturerBtn />
      <SendEmailBtn />
      <UnsubscribeManufacturerBtn />
    </div>
  );
};

export default ResellerManufacturerActions;
