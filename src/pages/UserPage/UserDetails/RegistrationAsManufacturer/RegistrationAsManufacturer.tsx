import React from 'react';
import SectionContainer from '../SectionContainer/SectionContainer';
import classes from './RegistrationAsManufacturer.module.css';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { showPortalPopUp } from '../../../../components/PortalPopUp/PortalPopUp';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import RulesInformForm from './RulesInformForm/RulesInformForm';
import ManufacturerDataForm from './ManufacturerDataForm/ManufacturerDataForm';
import { selectorRegions } from '../../../../store/addressSlice';
import { SelectOptionsType } from '../../../../types/types';

const getOptions = (optionsStore: SelectOptionsType[]) => {
  const options: SelectOptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...optionsStore);
  return options;
};

const RegistrationAsManufacturer = () => {
  const user = useAppSelector(selectorUser);
  const regions = useAppSelector(selectorRegions);
  const regionsOptions = getOptions(regions);

  const onCloseManufacturerDataForm = (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const name = response.get('name')!.toString();
      const inn = response.get('inn')!.toString();
      const locationId = response.get('locationId')!.toString();
      console.log('name, inn, locationId =', name, inn, locationId);
    }
  };

  const onCloseRulesInformForm = (result: boolean | FormData | undefined) => {
    if (result) {
      showPortalPopUp({
        popUpContent: <ManufacturerDataForm regionsOptions={regionsOptions} />,
        onClosePopUp: onCloseManufacturerDataForm,
        titleConfirmBtn: 'Регистрация',
      });
    }
  };

  const onClick = () => {
    if (user && user.email) {
      showPortalPopUp({
        popUpContent: <RulesInformForm email={user.email} />,
        onClosePopUp: onCloseRulesInformForm,
        titleConfirmBtn: 'Понятно',
      });
    }
  };

  return (
    <SectionContainer title={'Доступ к продажам'}>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.titleContainer}>
            <div className={classes.title}>{`Хочу получить доступ к продажам`}</div>
            <div className={classes.title}>{`и созданию карточек товаров,`}</div>
            <div className={classes.title}>{`как поставщик Пиломатериалов`}</div>
          </div>
          <div className={classes.btnContainer}>
            <ButtonComponent
              title={'Доступ'}
              buttonType={ButtonType.SECONDARY}
              style={{ width: 180 }}
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default RegistrationAsManufacturer;
