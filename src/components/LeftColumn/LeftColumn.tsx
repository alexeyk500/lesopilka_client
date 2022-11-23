import React, { ReactNode } from 'react';
import classes from './LeftColumn.module.css';

type PropsType = {
  title?: string;
  children: ReactNode;
};

const LeftColumn: React.FC<PropsType> = ({ title, children }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.title}>{title}</div>
        <div className={classes.scrollContainer}>{children}</div>
      </div>
    </div>
  );
};

export default LeftColumn;
