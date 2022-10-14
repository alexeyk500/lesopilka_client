import React from 'react';
import SectionContainer from '../SectionContainer/SectionContainer';
import classes from './MainInformation.module.css';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';

const MainInformation: React.FC = () => {
  const user = useAppSelector(selectorUser);

  return (
    <SectionContainer title={'Общая информация'}>
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
              <div className={classes.btnContainer}>
                <ButtonComponent title={'Редактировать'} buttonType={ButtonType.SECONDARY} style={{ width: 180 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default MainInformation;
