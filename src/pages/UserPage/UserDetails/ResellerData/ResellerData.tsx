import React from 'react';
import classes from './ResellerData.module.css';
import SectionContainer from '../../../../components/commonComponents/SectionContainer/SectionContainer';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import { HELP_DESK_EMAIL } from '../../../../utils/constants';

const ResellerData: React.FC = () => {
  const user = useAppSelector(selectorUser);

  const href = `mailto:${HELP_DESK_EMAIL}?subject=Учетные данные реселлера`;

  return (
    <SectionContainer title={'Реселлер'}>
      <div className={classes.description}>
        {`Пользователь зарегестрирован на площадке как Реселлер.\nУчетные данные реселлера, можно изменить через нашу службу поддержки:\n`}
        <a className={classes.email} href={href} target={'_blank'} rel="noreferrer">
          {`${HELP_DESK_EMAIL}`}
        </a>
      </div>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.dataContainer}>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Ф.И.O. :'}</div>
              <div
                className={classes.value}
              >{`${user?.reseller?.family} ${user?.reseller?.name} ${user?.reseller?.middleName}`}</div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Телефон :'}</div>
              <div className={classes.value}>{user?.reseller?.phone}</div>
            </div>
            <div className={classes.addSpace}>
              <div className={classes.rowDataContainer}>
                <div className={classes.title}>{'Регион :'}</div>
                <div className={classes.value}>{user?.reseller?.address.region.title}</div>
              </div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Населенный пункт :'}</div>
              <div className={classes.value}>{user?.reseller?.address.location.title}</div>
            </div>
            {user?.reseller?.address.street && user?.reseller?.address.building && (
              <div className={classes.rowDataContainer}>
                <div className={classes.title}>{'Адрес :'}</div>
                <div className={classes.value}>
                  {`${user?.reseller?.address.street}, ${user?.reseller?.address.building} ${
                    user?.reseller?.address.office ? ' ,' : ''
                  }${user?.reseller?.address.office ? user?.reseller?.address.office : ''}`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ResellerData;
