import React from 'react';
import SectionContainer from '../../../../components/commonComponents/SectionContainer/SectionContainer';
import classes from './RegistrationAsManufacturer.module.css';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { showPortalPopUp } from '../../../../components/PortalPopUp/PortalPopUp';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import RulesInformForm from './RulesInformForm/RulesInformForm';
import ManufacturerDataForm from './ManufacturerDataForm/ManufacturerDataForm';

const RegistrationAsManufacturer = () => {
  const user = useAppSelector(selectorUser);

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
        popUpContent: <ManufacturerDataForm />,
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
            {`Хочу получить доступ к продажам\nи созданию карточек товаров,\nкак поставщик Пиломатериалов`}
          </div>
          <div className={classes.value}>
            <ButtonComponent title={'Доступ'} buttonType={ButtonType.SECONDARY} onClick={onClick} />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default RegistrationAsManufacturer;
