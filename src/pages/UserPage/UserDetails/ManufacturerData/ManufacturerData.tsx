import React from 'react';
import classes from './ManufacturerData.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';

const ManufacturerData: React.FC = () => {
  const user = useAppSelector(selectorUser);

  return (
    <SectionContainer title={'Поставщик'}>
      <div className={classes.description}>
        После регистрации Поставщика пиломатериалов, его учетные данные можно изменить только
        через электронное письмо в нашу службу поддержки.
      </div>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.dataContainer}>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'ИНН :'}</div>
              <div className={classes.value}>{user?.manufacturer?.inn}</div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Название :'}</div>
              <div className={classes.value}>{user?.manufacturer?.title}</div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Телефон :'}</div>
              <div className={classes.value}>{user?.manufacturer?.phone}</div>
            </div>
          </div>
        </div>
      </div>

      {/*<div className={classes.content}>*/}
      {/*  <div className={classes.rowContainer}>*/}
      {/*    <div className={classes.rowDataContainer}>*/}
      {/*      <div className={classes.title}>{'ИНН :'}</div>*/}
      {/*      <div className={classes.value}>{user?.manufacturer?.inn}</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={classes.rowContainer}>*/}
      {/*    <div className={classes.rowDataContainer}>*/}
      {/*      <div className={classes.title}>{'Название :'}</div>*/}
      {/*      <div className={classes.value}>{user?.manufacturer?.title}</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={classes.rowContainer}>*/}
      {/*    <div className={classes.rowDataContainer}>*/}
      {/*      <div className={classes.title}>{'Место поиска :'}</div>*/}
      {/*      <div className={classes.value}>{user?.searchLocation?.title}</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </SectionContainer>
  );
};

export default ManufacturerData;
