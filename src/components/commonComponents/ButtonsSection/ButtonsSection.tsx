import React, { ReactNode } from 'react';
import classes from './ButtonsSection.module.css';

type PropsType = {
  title: string;
  children: ReactNode;
};

const ButtonsSection: React.FC<PropsType> = ({ title, children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.contentContainer}>{children}</div>
    </div>
  );
};

export default ButtonsSection;
