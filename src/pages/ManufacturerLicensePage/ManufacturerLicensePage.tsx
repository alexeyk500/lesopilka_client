import React from 'react';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import { useAppSelector } from '../../hooks/hooks';
import { selectorUser } from '../../store/userSlice';
import { CrumbType } from '../../types/types';
import { getManufacturerOrUserName } from '../UserPage/UserPage';
import MainColumn from '../../components/MainColumn/MainColumn';
import classes from './ManufacturerLicensePage.module.css';
import ManufacturerLicensePageControl from './ManufacturerLicensePageControl/ManufacturerLicensePageControl';
import ManufacturerLicensePageMainPart from './ManufacturerLicensePageMainPart/ManufacturerLicensePageMainPart';

const ManufacturerLicensePage: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const crumbs: CrumbType[] = [{ title: getManufacturerOrUserName(user) }, { title: 'Лицензии для публикации' }];

  return (
    <div className={classes.container}>
      <LeftColumn title={`Лицензии\nдля публикации`}>
        <ManufacturerLicensePageControl />
      </LeftColumn>
      <MainColumn noScroll crumbs={crumbs}>
        <ManufacturerLicensePageMainPart />
      </MainColumn>
    </div>
  );
};

export default ManufacturerLicensePage;
