import React from 'react';
import SectionContainer from '../../../components/commonComponents/SectionContainer/SectionContainer';
import classes from './RegistrationAsReseller.module.css';
import ButtonComponent, { ButtonType } from '../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { PageEnum } from '../../../components/AppRouter/AppRouter';
import { showPortalPopUp } from '../../../components/PortalPopUp/PortalPopUp';
import ResellerInformForm from './ResellerInformForm/ResellerInformForm';

const RegistrationAsReseller: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);

  const onCloseResellerInformForm = (result: boolean | FormData | undefined) => {
    if (result) {
      navigate(PageEnum.ResellerRegistration);
    }
  };

  const onClick = () => {
    if (user && user.email) {
      showPortalPopUp({
        popUpContent: <ResellerInformForm />,
        onClosePopUp: onCloseResellerInformForm,
        titleConfirmBtn: 'Понятно',
      });
    }
  };

  return (
    <SectionContainer title={'Стать Реселлером'}>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.titleContainer}>
            {`Хочу получить доступ к регистрации новых поставщиков пиломатериалов\nи получению комиссии от публикаций поставщиков о продаже пиломатериалов.`}
          </div>
        </div>
        <div className={classes.value}>
          <ButtonComponent title={'Доступ'} buttonType={ButtonType.SECONDARY} onClick={onClick} />
        </div>
      </div>
    </SectionContainer>
  );
};

export default RegistrationAsReseller;
