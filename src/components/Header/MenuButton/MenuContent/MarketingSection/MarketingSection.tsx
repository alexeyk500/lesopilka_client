import React from 'react';
import classes from '../MenuContent.module.css';
import priceIco from '../../../../../img/priceIco.svg';
import warehouseGrayIco from '../../../../../img/warehouseGrayIco.svg';
import { PageEnum } from '../../../../AppRouter/AppRouter';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorUser } from '../../../../../store/userSlice';
import { QueryEnum } from '../../../../../types/types';
import licenseIco from '../../../../../img/licenseIco.svg';

type PropsType = {
  closeMenuContent: () => void;
};

const MarketingSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);

  const onClickWindowCase = () => {
    if (user?.manufacturer?.id) {
      navigate(`${PageEnum.ManufacturerShowCasePage}?${QueryEnum.ManufacturerId}=${user.manufacturer.id}`);
      closeMenuContent();
    }
  };

  const onClickPrice = () => {
    if (user?.manufacturer?.id) {
      navigate(PageEnum.ManufacturerPricePage);
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
      Маркетинг
      <button className={classes.menuButton} onClick={onClickWindowCase}>
        <img src={warehouseGrayIco} className={classes.warehouseIco} alt="manufacturer window-case button" />
        Витрина
      </button>
      <button className={classes.menuButton} onClick={onClickPrice}>
        <img src={priceIco} className={classes.ico} alt="price button" />
        Прайс лист
      </button>
      <button className={classes.menuButton} onClick={onClickLicenses}>
        <img src={licenseIco} className={classes.ico} alt="licenses button" />
        Лицензии
      </button>
    </div>
  );
};

export default MarketingSection;
