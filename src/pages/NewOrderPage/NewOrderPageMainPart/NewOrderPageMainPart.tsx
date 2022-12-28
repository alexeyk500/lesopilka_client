import React from 'react';
import classes from './NewOrderPageMainPart.module.css';
import DateSection from './DateSection/DateSection';
import DeliverySection from './DeliverySection/DeliverySection';
import ContactPersonSection from './ContactPersonSection/ContactPersonSection';
import PaymentMethodSection from './PaymentMethodSection/PaymentMethodSection';
import OrderContentSection from './OrderContentSection/OrderContentSection';

const NewOrderPageMainPart: React.FC = () => {
  return (
    <div className={classes.container}>
      <DateSection />
      <DeliverySection />
      <ContactPersonSection />
      <PaymentMethodSection />
      <OrderContentSection />
    </div>
  );
};

export default NewOrderPageMainPart;
