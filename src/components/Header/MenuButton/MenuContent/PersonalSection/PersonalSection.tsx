import React from 'react';
import classes from '../MenuContent.module.css';
import userIco from '../../../../../img/userIco.svg';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  closeMenuContent: () => void;
};

const PersonalSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/user');
    closeMenuContent();
  };

  return (
    <div className={classes.section}>
      Личный кабинет
      <button className={classes.menuButton} onClick={onClick}>
        <img src={userIco} className={classes.ico} alt="user profile button" />
        Профиль
      </button>
    </div>
  );
};

export default PersonalSection;
