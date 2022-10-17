import React from 'react';
import classes from './ChangeManufacturerData.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';

const ChangeManufacturerData: React.FC = () => {
  const user = useAppSelector(selectorUser);

  return (
    <SectionContainer title={'Производитель'}>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.rowDataContainer}>
            <div className={classes.title}>{'ИНН :'}</div>
            <div className={classes.value}>{user?.manufacturer?.title}</div>
          </div>
        </div>
        <div className={classes.rowContainer}>
          <div className={classes.rowDataContainer}>
            <div className={classes.title}>{'Название :'}</div>
            <div className={classes.value}>{user?.manufacturer?.title}</div>
          </div>
        </div>
        <div className={classes.rowContainer}>
          <div className={classes.rowDataContainer}>
            <div className={classes.title}>{'Местонахождениe :'}</div>
            <div className={classes.value}>{user?.manufacturer?.location.title}</div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ChangeManufacturerData;
