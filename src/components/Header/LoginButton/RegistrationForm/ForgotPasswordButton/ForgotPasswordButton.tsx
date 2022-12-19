import React, { useRef } from 'react';
import { PopupRef, showPortalPopUp } from '../../../../PortalPopUp/PortalPopUp';
import EmailInputForm from '../../EmailInputForm/EmailInputForm';
import ButtonComponent from '../../../../commonComponents/ButtonComponent/ButtonComponent';
import classes from '../../LoginButton.module.css';
import { serverApi } from '../../../../../api/serverApi';
import ConfirmSendingPasswordRecoveryCodeForm from '../../ConfirmSendingPasswordRecoveryCodeForm/ConfirmSendingPasswordRecoveryCodeForm';
import EnterCodeForgotPasswordForm from '../../EnterCodeForgotPasswordForm/EnterCodeForgotPasswordForm';

const ForgotPasswordButton: React.FC = () => {
  const preloaderPopUpRef = useRef<PopupRef | null>(null);

  const sendConfirmedRecoveryCodeAndNewPassword = async (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const code = response.get('code');
      const password = response.get('password');
      if (code && password) {
        try {
          const passwordStr = password.toString();
          const codeStr = code.toString();
          showPortalPopUp({
            popUpContent: (
              <h3 style={{ color: '#4A90E2', margin: '64px 96px 64px 96px' }}>Происходит смена пароля...</h3>
            ),
            withoutButtons: true,
            ref: preloaderPopUpRef,
          });
          const result = await serverApi.sendConfirmedRecoveryPasswordCode(codeStr, passwordStr);
          preloaderPopUpRef.current?.closePopup();
          showPortalPopUp({
            popUpContent: (
              <h3
                style={{ color: '#4A90E2', margin: '64px 96px 64px 96px', whiteSpace: 'pre-line', textAlign: 'center' }}
              >{`${result.message},\n\n\n теперь Вы можете заново войти в систему`}</h3>
            ),
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
            customClassBottomBtnGroup: classes.oneCenterBtn,
          });
        } catch (e: any) {
          preloaderPopUpRef.current?.closePopup();
          showPortalPopUp({
            popUpContent: (
              <>
                <h3 style={{ color: '#4A90E2', marginTop: 32 }}>{`Ошибка востановления пароля этап проверки кода`}</h3>
                <br />
                {e.response.data.message && <h4 style={{ color: '#FF0000' }}>{e.response.data.message}</h4>}
              </>
            ),
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
          });
        }
      }
    }
  };

  const onCloseConfirmSendingRecoveryLetter = (response: boolean | FormData | undefined) => {
    if (response) {
      try {
        showPortalPopUp({
          popUpContent: <EnterCodeForgotPasswordForm />,
          titleConfirmBtn: 'Отправить',
          onClosePopUp: sendConfirmedRecoveryCodeAndNewPassword,
        });
      } catch (e: any) {
        showPortalPopUp({
          popUpContent: (
            <>
              <h3 style={{ color: '#4A90E2', marginTop: 32 }}>{`Ошибка востановления пароля этап ввода кода`}</h3>
              <br />
              {e.response.data.message && <h4 style={{ color: '#FF0000' }}>{e.response.data.message}</h4>}
            </>
          ),
          titleConfirmBtn: 'Понятно',
          oneCenterConfirmBtn: true,
        });
      }
    }
  };

  const sendEmailWithRecoveryPasswordCode = async (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email')!.toString();
      if (email) {
        try {
          showPortalPopUp({
            popUpContent: <h3 style={{ color: '#4A90E2', margin: '64px 96px 64px 96px' }}>Отправка письма...</h3>,
            withoutButtons: true,
            ref: preloaderPopUpRef,
          });
          await serverApi.sendRecoveryPasswordEmail(email);
          preloaderPopUpRef.current?.closePopup();
          showPortalPopUp({
            popUpContent: <ConfirmSendingPasswordRecoveryCodeForm email={email} />,
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
            customClassBottomBtnGroup: classes.oneCenterBtn,
            onClosePopUp: onCloseConfirmSendingRecoveryLetter,
          });
        } catch (e: any) {
          preloaderPopUpRef.current?.closePopup();
          showPortalPopUp({
            popUpContent: (
              <>
                <h3
                  style={{ color: '#4A90E2', marginTop: 32 }}
                >{`${email} - Ошибка востановления пароля этап отправки кода`}</h3>
                <br />
                {e.response.data.message && <h4 style={{ color: '#FF0000' }}>{e.response.data.message}</h4>}
              </>
            ),
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
          });
        }
      } else {
        preloaderPopUpRef.current?.closePopup();
        showPortalPopUp({
          popUpContent: <h3>Что-то пошло не так</h3>,
          titleConfirmBtn: 'Понятно',
          oneCenterConfirmBtn: true,
        });
      }
    }
  };

  const onForgotClick = () => {
    showPortalPopUp({
      popUpContent: <EmailInputForm />,
      titleConfirmBtn: 'Запросить код',
      onClosePopUp: sendEmailWithRecoveryPasswordCode,
    });
  };

  return (
    <ButtonComponent className={classes.forgotBtn} title={'Не помню пароль?'} onClick={onForgotClick} type="reset" />
  );
};

export default ForgotPasswordButton;
