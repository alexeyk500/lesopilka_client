import React, { useEffect, useState } from 'react';
import classes from './UserActivationPage.module.css';
import Preloader from '../../components/Preloader/Preloader';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { activateCandidateUserThunk, resetUser, selectorIsUserLoading, selectorUser } from '../../store/userSlice';
import { showPortalPopUp } from '../../components/PortalPopUp/PortalPopUp';
import { PageEnum } from '../../components/AppRouter/AppRouter';
import SuccessActivateUserForm from './SuccessActivateUserForm/SuccessActivateUserForm';

const UserActivationPage: React.FC = () => {
  const { code } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);
  const isProcessing = useAppSelector(selectorIsUserLoading);
  const [doActivate, setDoActivate] = useState(0);

  useEffect(() => {
    dispatch(resetUser());
  }, [dispatch]);

  useEffect(() => {
    setDoActivate(1);
  }, []);

  useEffect(() => {
    if (!user && code && doActivate === 1) {
      console.log('activateCandidateUserThunk code=', code, code.length);
      dispatch(activateCandidateUserThunk({ code })).then((result) => {
        if (!result.type.includes('/rejected')) {
          showPortalPopUp({
            popUpContent: <SuccessActivateUserForm />,
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
      {isProcessing ? (
        <Preloader title={'Активация аккаунта пользователя...'} />
      ) : (
        <Preloader title={'Подготовка к активации...'} />
      )}
    </div>
  );
};

export default UserActivationPage;
