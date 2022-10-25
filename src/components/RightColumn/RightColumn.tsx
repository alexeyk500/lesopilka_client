import React from 'react';
import classes from './RightColumn.module.css';

type PropsType = {
  children: React.ReactNode;
};

const RightColumn: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default RightColumn;
