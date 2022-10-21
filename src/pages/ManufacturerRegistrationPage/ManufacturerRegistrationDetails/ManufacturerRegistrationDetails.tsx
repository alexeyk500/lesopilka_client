import React from 'react';
import classes from './ManufacturerRegistrationDetails.module.css';
import ManufacturerRegistrationData from './ManufacturerRegistrationData/ManufacturerRegistrationData';

const ManufacturerRegistrationDetails: React.FC = () => {
  return (
    <div className={classes.container}>
      <ManufacturerRegistrationData />
    </div>
  );
};

export default ManufacturerRegistrationDetails;
