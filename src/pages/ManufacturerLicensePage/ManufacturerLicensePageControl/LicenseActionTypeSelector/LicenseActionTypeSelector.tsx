import React from 'react';
import classes from './LicenseActionTypeSelector.module.css';
import CheckBoxSquare from '../../../../components/commonComponents/CheckBoxSquare/CheckBoxSquare';
import { selectorManufacturerLicenseActionType, setLicenseActionType } from '../../../../store/manLicensesSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { LicenseActionTypeEnum } from '../../../../types/types';

const LicenseActionTypeSelector = () => {
  const dispatch = useAppDispatch();
  const licenseActionType = useAppSelector(selectorManufacturerLicenseActionType);

  const onSelectPurchase = () => {
    if (licenseActionType !== LicenseActionTypeEnum.purchase) {
      dispatch(setLicenseActionType(LicenseActionTypeEnum.purchase));
    }
  };

  const onSelectRedeem = () => {
    if (licenseActionType !== LicenseActionTypeEnum.redeem) {
      dispatch(setLicenseActionType(LicenseActionTypeEnum.redeem));
    }
  };

  return (
    <div className={classes.container}>
      <CheckBoxSquare
        id={1}
        title={'Покупка'}
        checked={licenseActionType === LicenseActionTypeEnum.purchase}
        onSelect={onSelectPurchase}
      />
      <CheckBoxSquare
        id={2}
        title={'Использование'}
        checked={licenseActionType === LicenseActionTypeEnum.redeem}
        onSelect={onSelectRedeem}
      />
    </div>
  );
};

export default LicenseActionTypeSelector;
