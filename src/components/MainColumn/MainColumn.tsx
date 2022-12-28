import React, { ReactNode } from 'react';
import classes from './MainColumn.module.css';

type PropsType = {
  children: ReactNode;
};

const MainColumn: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.scrollContainer}>{children}</div>
      </div>
    </div>
  );
};

export default MainColumn;
