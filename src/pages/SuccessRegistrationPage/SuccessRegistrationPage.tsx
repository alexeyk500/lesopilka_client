import React, { useEffect } from 'react';
import { showPortalPopUp } from '../../components/PortalPopUp/PortalPopUp';
import { useNavigate } from 'react-router-dom';
import SuccessRegistrationMessageForm from './SuccessRegistrationMessageForm/SuccessRegistrationMessageForm';
import UnitedPage from '../UnitedPage/UnitedPage';
import { PageEnum } from '../../components/AppRouter/AppRouter';

const SuccessRegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const onClosePopUp = () => {
    navigate(PageEnum.RootPage, { replace: true });
  };

  useEffect(() => {
    showPortalPopUp({
      popUpContent: <SuccessRegistrationMessageForm />,
      titleConfirmBtn: 'Понятно',
      oneCenterConfirmBtn: true,
      onClosePopUp: onClosePopUp,
    });
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <UnitedPage />
    </>
  );
};

export default SuccessRegistrationPage;
