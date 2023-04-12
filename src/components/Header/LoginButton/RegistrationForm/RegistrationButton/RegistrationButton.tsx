import React, { useRef } from 'react';
import { PopupRef, showPortalPopUp } from '../../../../PortalPopUp/PortalPopUp';
import RegistrationForm from '../RegistrationForm';
import ButtonComponent, { ButtonType } from '../../../../commonComponents/ButtonComponent/ButtonComponent';
import { serverApi } from '../../../../../api/serverApi';
import ConfirmEmailForm from '../../ConfirmEmailForm/ConfirmEmailForm';
import classes from '../../LoginButton.module.css';

const RegistrationButton: React.FC = () => {
  const preloaderPopUpRef = useRef<PopupRef | null>(null);

  const onCloseRegistrationPopUp = async (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email')!.toString();
      const password = response.get('password')!.toString();
      if (email && password) {
        try {
          showPortalPopUp({
            popUpContent: <h3 style={{ color: '#4A90E2', margin: '64px 96px 64px 96px' }}>Регистрация...</h3>,
            withoutButtons: true,
            ref: preloaderPopUpRef,
          });
          await serverApi.sendConfirmationEmail(email, password);
          preloaderPopUpRef.current?.closePopup();
          showPortalPopUp({
            popUpContent: <ConfirmEmailForm email={email} />,
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
            customClassBottomBtnGroup: classes.oneCenterBtn,
          });
        } catch (e: any) {
          preloaderPopUpRef.current?.closePopup();
          showPortalPopUp({
            popUpContent: (
              <>
                <h3
                  style={{ color: '#FF0000', marginTop: 32, whiteSpace: 'pre-line', textAlign: 'center' }}
                >{`Ошибка регистрации пользователя`}</h3>
                <h4
                  style={{ color: '#FF8E00', marginTop: 12, whiteSpace: 'pre-line', textAlign: 'center' }}
                >{`${email}`}</h4>
                {e.response.data.message && (
                  <h4 style={{ color: '#4A90E2', whiteSpace: 'pre-line', textAlign: 'center', padding: '0 24px' }}>
                    {e.response.data.message}
                  </h4>
                )}
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

  const onRegisterClick = () => {
    showPortalPopUp({
      popUpContent: <RegistrationForm />,
      onClosePopUp: onCloseRegistrationPopUp,
      titleConfirmBtn: 'Регистрация',
    });
  };
  return (
    <ButtonComponent title={'Регистрация'} buttonType={ButtonType.SECONDARY} onClick={onRegisterClick} type="reset" />
  );
};

export default RegistrationButton;
