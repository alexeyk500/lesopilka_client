import React from 'react';
import classes from '../MenuContent.module.css';
import priceIco from '../../../../../img/priceIco.svg';
import warehouseWindowCaseIco from '../../../../../img/warehouseWindowCaseIco.svg';
import { PageEnum } from '../../../../AppRouter/AppRouter';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorUser } from '../../../../../store/userSlice';
import { QueryEnum } from '../../../../../types/types';

type PropsType = {
  closeMenuContent: () => void;
};

const MarketingSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);

  const onClickWindowCase = () => {
    if (user?.manufacturer?.id) {
      navigate(`${PageEnum.ManufacturerWindowCasePage}?${QueryEnum.ManufacturerId}=${user.manufacturer.id}`);
      closeMenuContent();
    }
  };

  const onClickPrice = () => {
    if (user?.manufacturer?.id) {
      navigate(PageEnum.ManufacturerPricePage);
    }
    closeMenuContent();
  };

  return (
    <div className={classes.section}>
      Маркетинг
      <button className={classes.menuButton} onClick={onClickWindowCase}>
        <img src={warehouseWindowCaseIco} className={classes.ico} alt="manufacturer window-case button" />
        Витрина
      </button>
      <button className={classes.menuButton} onClick={onClickPrice}>
        <img src={priceIco} className={classes.ico} alt="price button" />
        Прайс лист
      </button>
    </div>
  );
};

export default MarketingSection;
