import React from 'react';
import SectionContainer from '../../../../components/commonComponents/SectionContainer/SectionContainer';
import classes from './ChangePassword.module.css';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { showPortalPopUp } from '../../../../components/PortalPopUp/PortalPopUp';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorUser, userCheckPasswordThunk, userUpdateThunk } from '../../../../store/userSlice';
import NewPasswordForm from './NewPasswordForm/NewPasswordForm';

const ChangePassword: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const dispatch = useAppDispatch();

  const onClosePopUpChangePasswordForm = (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const password = response.get('currentPassword')!.toString();
      if (user && user.email && password) {
        dispatch(userCheckPasswordThunk({ email: user.email, password })).then((result) => {
          if (result.type.includes('fulfilled')) {
            showPortalPopUp({
              popUpContent: <NewPasswordForm />,
              onClosePopUp: onClosePopUpNewPasswordForm,
              titleConfirmBtn: 'Ввести',
            });
          }
        });
      }
    }
  };

  const onClosePopUpNewPasswordForm = (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const password = response.get('password')!.toString();
      if (user && user.email && password) {
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        if (token && password) {
          dispatch(userUpdateThunk({ token, password })).then((result) => {
            if (result.type.includes('fulfilled')) {
              showPortalPopUp({
                popUpContent: (
                  <>
                    <h3 style={{ color: '#4A90E2', marginTop: 32 }}>{`Пароль успешно изменен`}</h3>
                    <br />
                  </>
                ),
                titleConfirmBtn: 'Понятно',
                oneCenterConfirmBtn: true,
                customClassBottomBtnGroup: classes.oneCenterBtn,
              });
            }
          });
        }
      }
    }
  };

  const onClick = () => {
    showPortalPopUp({
      popUpContent: <ChangePasswordForm />,
      onClosePopUp: onClosePopUpChangePasswordForm,
      titleConfirmBtn: 'Ввести',
    });
  };

  return (
    <SectionContainer title={'Смена пароля'}>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.title}>Сменить пароль</div>
          <div className={classes.value}>
            <ButtonComponent title={'Сменить'} buttonType={ButtonType.SECONDARY} onClick={onClick} />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ChangePassword;
