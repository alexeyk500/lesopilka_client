import React from 'react';
import classes from './ResellerRegistrationDetails.module.css';
import UserInformationSection from '../../../components/UserInformationSection/UserInformationSection';
import ResellerRegistrationData from './ResellerRegistrationData/ResellerRegistrationData';

const ResellerRegistrationDetails: React.FC = () => {
  return (
    <div className={classes.container}>
      <UserInformationSection />
      <ResellerRegistrationData />
    </div>
  );
};

export default ResellerRegistrationDetails;
