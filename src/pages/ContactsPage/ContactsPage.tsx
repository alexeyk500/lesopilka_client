import React from 'react';
import classes from './ContactsPage.module.css';
import MainColumn from '../../components/MainColumn/MainColumn';
import ContactItem from './ContactItem/ContactItem';

import contactsTemplate from '../../templates/contacts.json';

const ContactsPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <MainColumn noScroll>
        <div className={classes.title}>Контакты площадки</div>
        <div className={classes.contentContainer}>
          {contactsTemplate.contacts.map((contact, ind) => (
            <ContactItem key={ind} contact={contact} />
          ))}
        </div>
      </MainColumn>
    </div>
  );
};

export default ContactsPage;
