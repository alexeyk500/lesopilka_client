import React from 'react';
import classes from './ManufacturerRegistrationDetails.module.css';
import ManufacturerRegistrationData from './ManufacturerRegistrationData/ManufacturerRegistrationData';
import UserInformationSection from '../../UserPage/UserDetails/RegistrationAsManufacturer/UserInformationSection/UserInformationSection';

const ManufacturerRegistrationDetails: React.FC = () => {
  return (
    <div className={classes.container}>
      <UserInformationSection />
      <ManufacturerRegistrationData />
    </div>
  );
};

export default ManufacturerRegistrationDetails;
