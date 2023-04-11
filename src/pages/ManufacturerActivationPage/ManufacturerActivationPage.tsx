import React, { useEffect, useState } from 'react';
import classes from './ManufacturerActivationPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { resetUser, selectorUser } from '../../store/userSlice';
import Preloader from '../../components/Preloader/Preloader';
import { activateCandidateManufacturerThunk, selectorResellerIsLoading } from '../../store/resellerSlice';
import { showPortalPopUp } from '../../components/PortalPopUp/PortalPopUp';
import { PageEnum } from '../../components/AppRouter/AppRouter';
import SuccessActivateManufacturerForm from './SuccessActivateManufacturerForm/SuccessActivateManufacturerForm';

const ManufacturerActivationPage: React.FC = () => {
  const { code } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);
  const isProcessing = useAppSelector(selectorResellerIsLoading);
  const [doActivate, setDoActivate] = useState(0);

  useEffect(() => {
    dispatch(resetUser());
  }, [dispatch]);

  useEffect(() => {
    setDoActivate(1);
  }, []);

  useEffect(() => {
    if (!user && code && doActivate === 1) {
      dispatch(activateCandidateManufacturerThunk({ code })).then((result) => {
        if (!result.type.includes('/rejected')) {
          showPortalPopUp({
            popUpContent: <SuccessActivateManufacturerForm />,
            oneCenterConfirmBtn: true,
            titleConfirmBtn: 'Понятно',
          });
        } else {
          setTimeout(() => {
            navigate(PageEnum.RootPage);
          }, 1500);
        }
      });
      setDoActivate(2);
    }
  }, [user, code, doActivate, dispatch, navigate]);

  useEffect(() => {
    if (user && doActivate === 2) {
      navigate(PageEnum.UserPage);
    }
  }, [user, doActivate, navigate]);

  return (
    <div className={classes.container}>
      {isProcessing ? <Preloader title={'Активация аккаунта...'} /> : <Preloader title={'Подготовка к активации...'} />}
    </div>
  );
};

export default ManufacturerActivationPage;
