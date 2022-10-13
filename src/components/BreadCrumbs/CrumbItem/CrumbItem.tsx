import React from 'react';
import classes from './CrumbItem.module.css';
import rightArrow from '../../../img/rightArrow.svg';
import { CrumbType } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import classNames from "classnames";

type PropsType = {
  crumb: CrumbType;
  isLastCrumb: boolean;
  isColonAfterFirstCrumb?: boolean;
};

const CrumbItem: React.FC<PropsType> = ({ crumb, isLastCrumb, isColonAfterFirstCrumb }) => {
  const navigate = useNavigate();

  const onClick = () => {
    crumb.route && navigate(crumb.route);
  };

  return (
    <div className={classes.container}>
      <div className={classNames(classes.title, {[classes.lastCrumbs]: isLastCrumb})} onClick={onClick}>
        {crumb.title}
      </div>
      {isColonAfterFirstCrumb
        ? <div className={classes.colonContainer}>:</div>
        :!isLastCrumb && <img src={rightArrow} className={classes.separatorContainer} alt="rightArrow" />
      }
    </div>
  );
};

export default CrumbItem;
