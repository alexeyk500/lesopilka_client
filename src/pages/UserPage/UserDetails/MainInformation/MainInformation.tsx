import React from 'react';
import SectionContainer from '../../../../components/commonComponents/SectionContainer/SectionContainer';
import classes from './MainInformation.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorUser, userUpdateThunk } from '../../../../store/userSlice';
import { showPortalPopUp } from '../../../../components/PortalPopUp/PortalPopUp';
import ChangeUserNameForm from './ChangeUserNameForm/ChangeUserNameForm';
import ChangeUserPhoneForm from './ChangeUserPhoneForm/ChangeUserPhoneForm';
import ButtonEdit from '../../../../components/commonComponents/ButtonEdit/ButtonEdit';

const MainInformation: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const dispatch = useAppDispatch();

  const onClosePopUp = (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const name = response.get('nam6')?.toString();
      const phone = response.get('ph0n6')?.toString();
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token && name) {
        dispatch(userUpdateThunk({ token, name }));
      }
      if (token && phone) {
        dispatch(userUpdateThunk({ token, phone }));
      }
      if (token && user && user.phone && phone === '') {
        dispatch(userUpdateThunk({ token, phone: null }));
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
    if (user) {
      showPortalPopUp({
        popUpContent: <ChangeUserPhoneForm phone={user.phone || ''} />,
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
              <div className={classes.title}>{'Имя :'}</div>
              <div className={classes.value}>
                {user?.name}
                <ButtonEdit customClassName={classes.btnEdit} onClick={onClickEditName} dataTestId={'editName'} />
              </div>
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Эл.почта :'}</div>
              <div className={classes.value}>{user?.email}</div>
            </div>

            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Телефон :'}</div>
              <div className={classes.value}>
                {user?.phone}
                <ButtonEdit customClassName={classes.btnEdit} onClick={onClickEditPhone} dataTestId={'editPhone'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default MainInformation;
