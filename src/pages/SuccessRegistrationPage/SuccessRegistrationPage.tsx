import React, { useEffect } from 'react';
import MainPage from '../MainPage/MainPage';
import { showPortalPopUp } from '../../components/PortalPopUp/PortalPopUp';
import {useNavigate} from "react-router-dom";
import SuccessRegistrationMessageForm from "./SuccessRegistrationMessageForm/SuccessRegistrationMessageForm";

const SuccessRegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const onClosePopUp = () => {
    navigate('/', { replace: true })
  };

  useEffect(() => {
    showPortalPopUp({
      popUpContent: <SuccessRegistrationMessageForm />,
      titleConfirmBtn: 'Понятно',
      oneCenterConfirmBtn: true,
      onClosePopUp: onClosePopUp,
    });
  }, []);
  return (
    <>
      <MainPage />
    </>
  );
};

export default SuccessRegistrationPage;
