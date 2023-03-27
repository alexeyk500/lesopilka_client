import React from 'react';
import classes from '../MenuContent.module.css';
import catalogIco from '../../../../../img/catalogIco.svg';
import ordersIco from '../../../../../img/ordersIco.svg';
import licenseIco from '../../../../../img/licenseIco.svg';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorUser } from '../../../../../store/userSlice';
import { QueryEnum } from '../../../../../types/types';
import { PageEnum } from '../../../../AppRouter/AppRouter';

type PropsType = {
  closeMenuContent: () => void;
};

const ManufacturerSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);

  const onClickCatalog = () => {
    if (user?.manufacturer?.id) {
      navigate(`/manufacturer/?${QueryEnum.ManufacturerId}=${user.manufacturer.id}`);
    }
    closeMenuContent();
  };

  const onClickManufacturersOrder = () => {
    if (user?.manufacturer?.id) {
      navigate(PageEnum.ManufacturerOrdersPage);
    }
    closeMenuContent();
  };

  const onClickLicenses = () => {
    if (user?.manufacturer?.id) {
      navigate(PageEnum.ManufacturerLicensesPage);
    }
    closeMenuContent();
  };

  return (
    <div className={classes.section}>
      Продажи
      <button className={classes.menuButton} onClick={onClickCatalog}>
        <img src={catalogIco} className={classes.ico} alt="catalog button" />
        Мои товары
      </button>
      <button className={classes.menuButton} onClick={onClickManufacturersOrder}>
        <img src={ordersIco} className={classes.ico} alt="orders button" />
        Заказы мне
      </button>
      <button className={classes.menuButton} onClick={onClickLicenses}>
        <img src={licenseIco} className={classes.ico} alt="licenses button" />
        Лицензии
      </button>
    </div>
  );
};

export default ManufacturerSection;
