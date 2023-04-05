import React from 'react';
import classes from './ContactItem.module.css';
import { Link } from 'react-router-dom';
import { ContactType } from '../../../types/types';

type PropsType = {
  contact: ContactType;
};

const ContactItem: React.FC<PropsType> = ({ contact }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{contact.title}</div>
      <div className={classes.contactItem}>
        - {contact.description}
        {contact.email && (
          <a href={`mailto:${contact.email}`} className={classes.email} target="_blank" rel="noreferrer">
            {contact.emailDescription}
          </a>
        )}
        {contact.url && (
          <Link to={contact.url} className={classes.link} target="_blank">
            {contact.urlDescription}
          </Link>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
