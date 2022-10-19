import React from 'react';
import SectionContainer from '../SectionContainer/SectionContainer';
import classes from './MainInformation.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorUser, userUpdateThunk } from '../../../../store/userSlice';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { showPortalPopUp } from '../../../../components/PortalPopUp/PortalPopUp';
import ChangeUserNameForm from './ChangeUserNameForm/ChangeUserNameForm';
import ChangeUserPhoneForm from './ChangeUserPhoneForm/ChangeUserPhoneForm';

const MainInformation: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const dispatch = useAppDispatch();

  const onClosePopUp = (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const name = response.get('name')?.toString();
      const phone = response.get('phone')?.toString();
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token && name) {
        dispatch(userUpdateThunk({ token, name }));
      }
      if (token && phone) {
        dispatch(userUpdateThunk({ token, phone }));
      }
    }
  };

  const onClickEditName = () => {
    if (user && user.name) {
      showPortalPopUp({
        popUpContent: <ChangeUserNameForm name={user.name} />,
        onClosePopUp: onClosePopUp,
        titleConfirmBtn: 'Сохранить',
      });
    }
  };

  const onClickEditPhone = () => {
    if (user && user.phone) {
      showPortalPopUp({
        popUpContent: <ChangeUserPhoneForm phone={user.phone} />,
        onClosePopUp: onClosePopUp,
        titleConfirmBtn: 'Сохранить',
      });
    }
  };

  return (
    <SectionContainer title={'Учетная информация'}>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <div className={classes.dataContainer}>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Эл.почта пользователя :'}</div>
              <div className={classes.value}>{user?.email}</div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Имя пользователя :'}</div>
              <div className={classes.value}>{user?.name}</div>
              <div className={classes.btnContainer}>
                <ButtonComponent
                  title={'Редактировать'}
                  buttonType={ButtonType.SECONDARY}
                  style={{ width: 180 }}
                  onClick={onClickEditName}
                />
              </div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Телефон пользователя :'}</div>
              <div className={classes.value}>{user?.phone}</div>
              <div className={classes.btnContainer}>
                <ButtonComponent
                  title={'Редактировать'}
                  buttonType={ButtonType.SECONDARY}
                  style={{ width: 180 }}
                  onClick={onClickEditPhone}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default MainInformation;
