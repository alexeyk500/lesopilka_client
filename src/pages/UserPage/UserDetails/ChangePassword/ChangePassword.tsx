import React from 'react';
import SectionContainer from '../SectionContainer/SectionContainer';
import classes from './ChangePassword.module.css';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';

const ChangePassword: React.FC = () => {
  return (
    <SectionContainer title={'Смена пароля'}>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.title}>Сменить пароль</div>
          <div className={classes.btnContainer}>
            <ButtonComponent title={'Сменить'} buttonType={ButtonType.SECONDARY} style={{ width: 180 }} />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ChangePassword;
