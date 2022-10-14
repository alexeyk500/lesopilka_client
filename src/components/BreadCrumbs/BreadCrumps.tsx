import React from 'react';
import classes from './BreadCrumbs.module.css';
import { CrumbType } from '../../types/types';
import CrumbItem from './CrumbItem/CrumbItem';

type PropsType = {
  crumbs: CrumbType[];
};

const BreadCrumbs: React.FC<PropsType> = ({ crumbs }) => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {crumbs.map((crumb, ind) => (
          <CrumbItem
            key={ind}
            crumb={crumb}
            isColonAfterFirstCrumb={ind === 0}
            isLastCrumb={ind === crumbs.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default BreadCrumbs;
