import React from 'react';
import classes from "../MenuContent.module.css";
import rulesIco from "../../../../../img/rulesIco.svg";
import contactsIco from "../../../../../img/contactsIco.svg";

const ReferenceSection: React.FC = () => {
  return (
    <div className={classes.section}>
      Справочная
      <button className={classes.menuButton}>
        <img src={rulesIco} className={classes.ico} alt="favorites goods button"/>
        Правила
      </button>
      <button className={classes.menuButton}>
        <img src={contactsIco} className={classes.ico} alt="favorites search buttons"/>
        Контакты
      </button>
    </div>
  );
};

export default ReferenceSection;
