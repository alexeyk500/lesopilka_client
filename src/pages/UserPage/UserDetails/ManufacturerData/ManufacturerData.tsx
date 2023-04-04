import React from 'react';
import classes from './ManufacturerData.module.css';
import SectionContainer from '../../../../components/commonComponents/SectionContainer/SectionContainer';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import { HELP_DESK_EMAIL } from '../../../../utils/constants';

const ManufacturerData: React.FC = () => {
  const user = useAppSelector(selectorUser);

  const href = `mailto:${HELP_DESK_EMAIL}?subject=Учетные данные поставщика`;

  return (
    <SectionContainer title={'Поставщик'}>
      <div className={classes.description}>
        {`Пользователь зарегестрирован как поставщик пиломатериалов.\nУчетные данные поставщика, можно изменить через нашу службу поддержки:\n`}
        <a className={classes.email} href={href} target={'_blank'} rel="noreferrer">
          {`${HELP_DESK_EMAIL}`}
        </a>
      </div>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.dataContainer}>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Название :'}</div>
              <div className={classes.value}>{user?.manufacturer?.title}</div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'ИНН :'}</div>
              <div className={classes.value}>{user?.manufacturer?.inn}</div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Регион :'}</div>
              <div className={classes.value}>{user?.manufacturer?.address.region.title}</div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Населенный пункт :'}</div>
              <div className={classes.value}>{user?.manufacturer?.address.location.title}</div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Адрес :'}</div>
              <div className={classes.value}>
                {`${user?.manufacturer?.address.street}, ${user?.manufacturer?.address.building} ${
                  user?.manufacturer?.address.office ? ' ,' : ''
                }${user?.manufacturer?.address.office ? user?.manufacturer?.address.office : ''}`}
              </div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Телефон :'}</div>
              <div className={classes.value}>{user?.manufacturer?.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ManufacturerData;
