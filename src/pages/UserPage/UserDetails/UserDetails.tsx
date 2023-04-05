import React from 'react';
import classes from './UserDetails.module.css';
import MainInformation from './MainInformation/MainInformation';
import RegistrationAsManufacturer from '../RegistrationAsManufacturer/RegistrationAsManufacturer';
import ChangePassword from './ChangePassword/ChangePassword';
import ManufacturerData from './ManufacturerData/ManufacturerData';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import RegistrationAsReseller from '../RegistrationAsReseller/RegistrationAsReseller';
import ResellerData from './ResellerData/ResellerData';

const UserDetails: React.FC = () => {
  const user = useAppSelector(selectorUser);

  return (
    <div className={classes.container}>
      <MainInformation />
      <ChangePassword />
      {user?.manufacturer ? <ManufacturerData /> : !user?.reseller && <RegistrationAsManufacturer />}
      {user?.reseller ? <ResellerData /> : !user?.manufacturer && <RegistrationAsReseller />}
    </div>
  );
};

export default UserDetails;
