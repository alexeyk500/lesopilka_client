import React from 'react';
import classes from './UserDetails.module.css';
import MainInformation from './MainInformation/MainInformation';
import RegistrationAsManufacturer from './RegistrationAsManufacturer/RegistrationAsManufacturer';
import ChangePassword from './ChangePassword/ChangePassword';
import ChangeManufacturerData from './ChangeManufacturerData/ChangeManufacturerData';
import SearchLocation from './SearchLocation/SearchLocation';

const UserDetails: React.FC = () => {
  return (
    <div className={classes.container}>
      <MainInformation />
      <ChangePassword />
      <SearchLocation />
      <RegistrationAsManufacturer />
      <ChangeManufacturerData />
    </div>
  );
};

export default UserDetails;
