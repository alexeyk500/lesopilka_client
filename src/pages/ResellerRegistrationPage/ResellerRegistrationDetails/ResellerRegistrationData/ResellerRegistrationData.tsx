import React, { FormEvent } from 'react';
import SectionContainer from '../../../../components/commonComponents/SectionContainer/SectionContainer';
import classes from './ResellerRegistrationData.module.css';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import RegionLocationInputs from '../../../../components/RegionLocationInputs/RegionLocationInputs';
import { getInputFormData } from '../../../../utils/functions';
import { useAppDispatch } from '../../../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../../components/AppRouter/AppRouter';
import { userCreateResellerThunk } from '../../../../store/userSlice';

const ResellerRegistrationData: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const family = getInputFormData(event.currentTarget, 'fam1ly');
    const name = getInputFormData(event.currentTarget, 'nam6');
    const middleName = getInputFormData(event.currentTarget, 'm11dl6nam6');
    const phone = getInputFormData(event.currentTarget, 'ph0n6');
    const locationId = Number(getInputFormData(event.currentTarget, 'l0cat10n'));
    if (family && name && middleName && phone && locationId) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        dispatch(userCreateResellerThunk({ token, family, name, middleName, phone, locationId })).then(() => {
          navigate(PageEnum.UserPage);
        });
      }
    }
  };

  const onClickCancel = () => {
    navigate(PageEnum.UserPage);
  };

  return (
    <SectionContainer title={'Реселлер'}>
      <div className={classes.content}>
        <div className={classes.subtitle}>Введите о себе достоверную информацию</div>
        <div className={classes.rowContainer}>
          <form className={classes.dataContainer} onSubmit={onSubmit}>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Фамилия:'}</div>
              <input className={classes.input} name="fam1ly" type="text" placeholder={'Введите фамилию'} required />
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Имя:'}</div>
              <input className={classes.input} name="nam6" type="text" placeholder={'Введите имя'} required />
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Отчество:'}</div>
              <input
                className={classes.input}
                name="m11dl6nam6"
                type="text"
                placeholder={'Введите отчество'}
                required
              />
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Контактный Телефон :'}</div>
              <div className={classes.subtitleInner}>
                {'Выплаты вознаграждения реселлера будут производится\nна карту привязанную к данному номеру телефона'}
              </div>
              <input className={classes.input} name="ph0n6" type="text" placeholder={'Введите телефон'} required />
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Местонахождение:'}</div>
              <RegionLocationInputs />
            </div>
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
    </SectionContainer>
  );
};

export default ResellerRegistrationData;
