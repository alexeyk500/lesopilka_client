import React, { useEffect } from 'react';
import MainPageOld from '../MainPageOld/MainPageOld';
import { showPortalPopUp } from '../../components/PortalPopUp/PortalPopUp';
import { useNavigate } from 'react-router-dom';
import SuccessRegistrationMessageForm from './SuccessRegistrationMessageForm/SuccessRegistrationMessageForm';

const SuccessRegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const onClosePopUp = () => {
    navigate('/', { replace: true });
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
      <MainPageOld />
    </>
  );
};

export default SuccessRegistrationPage;
