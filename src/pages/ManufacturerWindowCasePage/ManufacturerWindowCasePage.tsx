import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectorUser } from '../../store/userSlice';
import { CrumbType, QueryEnum } from '../../types/types';
import { getManufacturerOrUserName } from '../UserPage/UserPage';
import classes from '../ManufacturerOrdersPage/ManOrdersPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';
import ManufacturerWindowCaseControl from './ManufacturerWindowCaseControl/ManufacturerWindowCaseControl';
import ManufacturerWindowCaseMainPart from './ManufacturerWindowCaseMainPart/ManufacturerWindowCaseMainPart';
import { useSearchParams } from 'react-router-dom';

const ManufacturerWindowCasePage: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const crumbs: CrumbType[] = [{ title: getManufacturerOrUserName(user) }, { title: 'Витрина ООО Лесопилка' }];

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const mid = searchParams.get(QueryEnum.ManufacturerId);
    console.log('mid =', mid);
  }, [searchParams]);

  return (
    <div className={classes.container}>
      <LeftColumn title={`Витрина`}>
        <ManufacturerWindowCaseControl />
      </LeftColumn>
      <MainColumn noScroll crumbs={crumbs}>
        <ManufacturerWindowCaseMainPart />
      </MainColumn>
    </div>
  );
};

export default ManufacturerWindowCasePage;
