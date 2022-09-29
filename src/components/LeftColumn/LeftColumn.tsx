import React, { ReactNode } from 'react';
import classes from './LeftColumn.module.css';

type PropsType = {
  children: ReactNode;
};

const LeftColumn: React.FC<PropsType> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default LeftColumn;
