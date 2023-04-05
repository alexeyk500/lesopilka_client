import React from 'react';
import classes from '../MenuContent.module.css';
import rulesIco from '../../../../../img/rulesIco.svg';
import contactsIco from '../../../../../img/contactsIco.svg';
import { PageEnum } from '../../../../AppRouter/AppRouter';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  closeMenuContent: () => void;
};

const ReferenceSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();

  const onClickRules = () => {
    navigate(PageEnum.RulesPage);
    closeMenuContent();
  };

  const onClickContacts = () => {
    navigate(PageEnum.ContactsPage);
    closeMenuContent();
  };

  return (
    <div className={classes.section}>
      Справочная
      <button className={classes.menuButton} onClick={onClickRules}>
        <img src={rulesIco} className={classes.ico} alt="rules button" />
        Правила
      </button>
      <button className={classes.menuButton} onClick={onClickContacts}>
        <img src={contactsIco} className={classes.ico} alt="contacts buttons" />
        Контакты
      </button>
    </div>
  );
};

export default ReferenceSection;
