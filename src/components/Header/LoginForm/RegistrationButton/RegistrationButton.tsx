import React from 'react';
import ButtonComponent, { ButtonType } from '../../../commonComponents/ButtonComponent/ButtonComponent';

const RegistrationButton: React.FC = () => {
  const onRegisterClick = () => {
    console.log('onRegisterClick');
  };

  return (
    <ButtonComponent title={'Регистрация'} buttonType={ButtonType.SECONDARY} onClick={onRegisterClick} type="button" />
  );
};

export default RegistrationButton;
