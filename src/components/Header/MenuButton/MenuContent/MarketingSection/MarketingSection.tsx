import React from 'react';
import classes from '../MenuContent.module.css';
import priceIco from '../../../../../img/priceIco.svg';
// import idCardIco from '../../../../../img/idCardIco.svg';
import { PageEnum } from '../../../../AppRouter/AppRouter';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorUser } from '../../../../../store/userSlice';

type PropsType = {
  closeMenuContent: () => void;
};

const MarketingSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);

  const onClickPrice = () => {
    if (user?.manufacturer?.id) {
      navigate(PageEnum.ManufacturerPricePage);
    }
    closeMenuContent();
  };

  return (
    <div className={classes.section}>
      Маркетинг
      {/*<button className={classes.menuButton}>*/}
      {/*  <img src={idCardIco} className={classes.ico} alt="about page button" />*/}
      {/*  Визитка*/}
      {/*</button>*/}
      <button className={classes.menuButton} onClick={onClickPrice}>
        <img src={priceIco} className={classes.ico} alt="price button" />
        Прайс лист
      </button>
    </div>
  );
};

export default MarketingSection;
