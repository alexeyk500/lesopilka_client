import React, { useEffect } from 'react';
import classes from './ManufacturerActivationPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { resetUser, selectorUser } from '../../store/userSlice';
import Preloader from '../../components/Preloader/Preloader';
import { activateCandidateManufacturerThunk, selectorResellerIsLoading } from '../../store/resellerSlice';
import { showPortalPopUp } from '../../components/PortalPopUp/PortalPopUp';
import { PageEnum } from '../../components/AppRouter/AppRouter';

const ManufacturerActivationPage: React.FC = () => {
  const { code } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);
  const isProcessing = useAppSelector(selectorResellerIsLoading);

  useEffect(() => {
    if (user) {
      dispatch(resetUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!user && code) {
      console.log('will do manufacturer activate code =', code);
      dispatch(activateCandidateManufacturerThunk({ code })).then((result) => {
        if (!result.type.includes('/rejected')) {
          showPortalPopUp({
            popUpContent: <div>Успешная Активация</div>,
            onClosePopUp: () => {
              navigate(PageEnum.RootPage);
              // dispatch(userLoginByTokenThunk())
              //   .then(()=>{
              //     navigate(PageEnum.RootPage);
              //   })
            },
            titleConfirmBtn: 'Понятно',
          });
        } else {
          setTimeout(() => {
            navigate(PageEnum.RootPage);
          }, 1500);
        }
      });
    }
  }, [user, code, dispatch, navigate]);

  return (
    <div className={classes.container}>
      {isProcessing ? <Preloader title={'Активация аккаунта...'} /> : <Preloader title={'Подготовка к активации...'} />}
    </div>
  );
};

export default ManufacturerActivationPage;
