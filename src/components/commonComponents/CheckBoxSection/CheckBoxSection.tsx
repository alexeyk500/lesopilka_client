import React, { ReactNode } from 'react';
import classes from './CheckBoxSection.module.css';

type PropsType = {
  title?: string;
  children: ReactNode;
};

const CheckBoxSection: React.FC<PropsType> = ({ title, children }) => {
  return (
    <div className={classes.container}>
      {title && <div className={classes.title}>{title}</div>}
      <div className={classes.contentContainer}>{children}</div>
    </div>
  );
};

export default CheckBoxSection;
