import React, { FormEvent } from 'react';
import classes from './ManufacturerRegistrationData.module.css';
import SectionContainer from '../../../../components/commonComponents/SectionContainer/SectionContainer';
import ManufacturerAddressData from './ManufacturerAddressData/ManufacturerAddressData';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorIsUserLoading, userCreateManufacturerThunk } from '../../../../store/userSlice';
import { getInputFormData } from '../../../../utils/functions';
import { PageEnum } from '../../../../components/AppRouter/AppRouter';
import { useNavigate } from 'react-router-dom';
import { createCandidateManufacturerThunk, selectorResellerIsLoading } from '../../../../store/resellerSlice';
import { showPortalPopUp } from '../../../../components/PortalPopUp/PortalPopUp';
import SuccessCandidateManufacturerForm from '../../../ResellerCreateManufacturerPage/SuccessCandidateManufacturerForm/SuccessCandidateManufacturerForm';
import Preloader from '../../../../components/Preloader/Preloader';
import classNames from 'classnames';
import SuccessRegistrationManufacturerForm from './SuccessRegistarationManufacturerForm/SuccessRegistrationManufacturerForm';

type PropsType = {
  isFromReseller?: boolean;
};

const ManufacturerRegistrationData: React.FC<PropsType> = ({ isFromReseller }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isCandidateManufacturerCreating = useAppSelector(selectorResellerIsLoading);
  const isManufacturerCreating = useAppSelector(selectorIsUserLoading);
  const isLoading = isCandidateManufacturerCreating || isManufacturerCreating;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = getInputFormData(event.currentTarget, 't1tl6');
    const inn = getInputFormData(event.currentTarget, 'inn');
    const phone = getInputFormData(event.currentTarget, 'ph0n6');
    const email = getInputFormData(event.currentTarget, 'ema1l');
    const locationId = getInputFormData(event.currentTarget, 'l0cat10n');
    const street = getInputFormData(event.currentTarget, 'str66t');
    const building = getInputFormData(event.currentTarget, 'bu1ld1ng');
    const office = getInputFormData(event.currentTarget, 'off1c6');
    const postIndex = getInputFormData(event.currentTarget, 'p0st1nd6x');

    if (title && inn && email && phone && locationId && street && building && postIndex) {
      if (isFromReseller) {
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        if (!isLoading && token) {
          dispatch(
            createCandidateManufacturerThunk({
              token,
              title,
              inn,
              phone,
              email,
              locationId,
              street,
              building,
              office,
              postIndex,
            })
          ).then((result) => {
            if (!result.type.includes('/rejected')) {
              showPortalPopUp({
                popUpContent: <SuccessCandidateManufacturerForm email={email} title={title} />,
                onClosePopUp: () => {
                  navigate(PageEnum.ResellerCabinetPage);
                },
                titleConfirmBtn: 'Понятно',
              });
            }
          });
        }
      } else {
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        if (!isLoading && token) {
          dispatch(
            userCreateManufacturerThunk({
              token,
              title,
              inn,
              email,
              phone,
              locationId,
              street,
              building,
              office,
              postIndex,
            })
          ).then((result) => {
            if (!result.type.includes('/rejected')) {
              navigate(PageEnum.UserPage);
              showPortalPopUp({
                popUpContent: <SuccessRegistrationManufacturerForm />,
                oneCenterConfirmBtn: true,
                titleConfirmBtn: 'Понятно',
              });
            }
          });
        }
      }
    }
  };

  const onClickCancel = () => {
    if (isFromReseller) {
      navigate(PageEnum.ResellerCabinetPage);
    } else {
      navigate(PageEnum.UserPage);
    }
  };

  return (
    <SectionContainer title={isFromReseller ? 'Регистрация Поставщика' : 'Поставщик'}>
      <div className={classNames(classes.content, { [classes.isLoading]: isLoading })}>
        <div className={classes.subtitle}>Введите информацию из учредительных документов поставщика</div>
        <div className={classes.rowContainer}>
          <form className={classes.dataContainer} onSubmit={onSubmit}>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Название организации :'}</div>
              <input className={classes.input} name="t1tl6" type="text" placeholder={'Введите название'} required />
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'ИНН организации :'}</div>
              <input className={classes.input} name="inn" type="text" placeholder={'Введите ИНН'} required />
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Электронная почта организации :'}</div>
              <input
                className={classes.input}
                name="ema1l"
                type="text"
                placeholder={'Введите электронную почту'}
                required
              />
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Телефон организации :'}</div>
              <input className={classes.input} name="ph0n6" type="text" placeholder={'Введите телефон'} required />
            </div>
            <ManufacturerAddressData />
            <div className={classes.btnGroup}>
              <ButtonComponent title={'Регистрация'} type={'submit'} />
              <ButtonComponent
                title={'Отмена'}
                buttonType={ButtonType.SECONDARY}
                type={'button'}
                onClick={onClickCancel}
              />
            </div>
          </form>
        </div>
      </div>
      {isLoading && (
        <div className={classes.preloaderContainer}>
          <Preloader title={'Обработка запроса...'} />
        </div>
      )}
    </SectionContainer>
  );
};

export default ManufacturerRegistrationData;
