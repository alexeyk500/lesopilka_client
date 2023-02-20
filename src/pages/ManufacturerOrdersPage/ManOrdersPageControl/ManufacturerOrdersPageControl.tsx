import React from 'react';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';
import ManOrdersDateIntervalSelector from './ManOrdersDateIntervalSelector/ManOrdersDateIntervalSelector';
import ManOrderStatusSelector from './ManOrderStatusSelector/ManOrderStatusSelector';

const ManufacturerOrdersPageControl = () => {
  return (
    <>
      <ManOrdersDateIntervalSelector />
      <ManOrderStatusSelector />
      <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
    </>
  );
};

export default ManufacturerOrdersPageControl;
