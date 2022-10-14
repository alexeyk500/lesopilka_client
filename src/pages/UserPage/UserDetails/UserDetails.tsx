import React from 'react';
import classes from './UserDetails.module.css';
import MainInformation from './MainInformation/MainInformation';
import RegistrationAsManufacturer from './RegistrationAsManufacturer/RegistrationAsManufacturer';
import ChangePassword from './ChangePassword/ChangePassword';

const UserDetails: React.FC = () => {
  return (
    <div className={classes.container}>
      <MainInformation />
      <ChangePassword />
      <RegistrationAsManufacturer />
    </div>
  );
};

export default UserDetails;
