import React from 'react';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import UserOrdersDateIntervalSelector from './UserOrdersDateIntervalSelector/UserOrdersDateIntervalSelector';
import UserOrderStatusSelector from './UserOrderStatusSelector/UserOrderStatusSelector';

const UserOrdersPageControl: React.FC = () => {
  return (
    <>
      <UserOrdersDateIntervalSelector />
      <UserOrderStatusSelector />
      <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
    </>
  );
};

export default UserOrdersPageControl;
