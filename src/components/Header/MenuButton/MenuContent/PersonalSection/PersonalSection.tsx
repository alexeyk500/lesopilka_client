import React from 'react';
import classes from "../MenuContent.module.css";
import userIco from "../../../../../img/userIco.svg";

const PersonalSection: React.FC = () => {
  return (
    <div className={classes.section}>
      Личный кабинет
      <button className={classes.menuButton}>
        <img src={userIco} className={classes.ico} alt="user profile button"/>
        Профиль
      </button>
    </div>
  );
};

export default PersonalSection;
