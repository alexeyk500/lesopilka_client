import React from 'react';
import classes from './LoginButton.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { resetUser, selectorUser } from '../../../store/userSlice';
import { showPortalPopUp } from '../../PortalPopUp/PortalPopUp';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../AppRouter/AppRouter';
import useLoginUser from '../../../hooks/useLoginUser';

const LoginButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginUser = useLoginUser();
  const user = useAppSelector(selectorUser);

  const logoutUser = () => {
    dispatch(resetUser());
  };

  const onClosePopUpLogout = (result?: boolean | FormData | undefined) => {
    if (result) {
      logoutUser();
      navigate(PageEnum.RootPage);
    }
  };

  const onClickLogin = () => {
    if (user) {
      showPortalPopUp({
        popUpContent: <div className={classNames(classes.containerLogout)}>{`Выйти из аккаунта: \n${user.name}`}</div>,
        titleConfirmBtn: 'Выйти',
        customClassBottomBtnGroup: classes.customClassBottomBtnGroupLogout,
        onClosePopUp: onClosePopUpLogout,
      });
    } else {
      loginUser();
    }
  };

  return (
    <div className={classes.container} onClick={onClickLogin} data-test-id={'loginButtonId'}>
      {user ? user.name : 'Войти'}
    </div>
  );
};

export default LoginButton;
