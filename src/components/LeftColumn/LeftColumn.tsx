import React, { ReactNode } from 'react';
import classes from './LeftColumn.module.css';
import classNames from 'classnames';

type PropsType = {
  title?: string;
  hasScroll?: boolean;
  children: ReactNode;
};

const LeftColumn: React.FC<PropsType> = ({ title, hasScroll, children }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.title}>{title}</div>
        <div className={classNames(classes.noScrollContainer, { [classes.scrollContainer]: hasScroll })}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
