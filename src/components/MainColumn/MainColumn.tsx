import React, { ReactNode } from 'react';
import classes from './MainColumn.module.css';
import classNames from 'classnames';

type PropsType = {
  children: ReactNode;
  noScroll?: boolean;
};

const MainColumn: React.FC<PropsType> = ({ children, noScroll }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classNames(classes.scrollContainer, { [classes.noScroll]: noScroll })}>{children}</div>
      </div>
    </div>
  );
};

export default MainColumn;
