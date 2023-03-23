import React, { ReactNode } from 'react';
import classes from './MainColumn.module.css';
import classNames from 'classnames';
import BreadCrumbs from '../BreadCrumbs/BreadCrumps';
import { CrumbType } from '../../types/types';

type PropsType = {
  children: ReactNode;
  noScroll?: boolean;
  crumbs?: CrumbType[];
};

const MainColumn: React.FC<PropsType> = ({ children, noScroll, crumbs }) => {
  return (
    <div className={classes.wrapper}>
      {crumbs && (
        <div className={classes.crumbsContainer}>
          <BreadCrumbs crumbs={crumbs} />
        </div>
      )}
      <div className={classes.container}>
        <div className={classNames(classes.scrollContainer, { [classes.noScroll]: noScroll })}>{children}</div>
      </div>
    </div>
  );
};

export default MainColumn;
