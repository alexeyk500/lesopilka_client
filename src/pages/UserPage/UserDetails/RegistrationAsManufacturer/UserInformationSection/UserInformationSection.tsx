import React from 'react';
import SectionContainer from '../../../../../components/commonComponents/SectionContainer/SectionContainer';
import classes from './UserInformationSection.module.css';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorUser } from '../../../../../store/userSlice';

const UserInformationSection: React.FC = () => {
  const user = useAppSelector(selectorUser);

  return (
    <SectionContainer title={'Пользователь'}>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.dataContainer}>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Эл.почта пользователя :'}</div>
              <div className={classes.value}>{user?.email}</div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Имя пользователя :'}</div>
              <div className={classes.value}>{user?.name}</div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default UserInformationSection;
