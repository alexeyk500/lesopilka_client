import React from 'react';
import classes from '../MenuContent.module.css';
import userIco from '../../../../../img/userIco.svg';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../../AppRouter/AppRouter';

type PropsType = {
  closeMenuContent: () => void;
};

const PersonalSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(PageEnum.UserPage);
    closeMenuContent();
  };

  return (
    <div className={classes.section}>
      Профиль
      <button className={classes.menuButton} onClick={onClick}>
        <img src={userIco} className={classes.ico} alt="user profile button" />
        Личный кабинет
      </button>
    </div>
  );
};

export default PersonalSection;
