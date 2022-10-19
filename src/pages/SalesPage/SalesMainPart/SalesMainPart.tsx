import React from 'react';
import classes from './SalesMainPart.module.css';
import SalesCardList from './SalesCardList/SalesCardList';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumps';
import { CrumbType } from '../../../types/types';
import { getUserName } from '../../UserPage/UserPage';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';

const SalesMainPart: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const crumbs: CrumbType[] = [{ title: getUserName(user), route: '/' }, { title: 'Продажи' }];

  return (
    <div className={classes.container}>
      <div className={classes.breadCrumbsContainer}>
        <BreadCrumbs crumbs={crumbs} />
      </div>
      <SalesCardList />
    </div>
  );
};

export default SalesMainPart;
