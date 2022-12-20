import React from 'react';
import classes from './IconButton.module.css';
import classNames from 'classnames';

type PropsType = {
  ico: string;
  title: string;
  secondRow?: string;
  customIconClasses?: string;
  onClick?: () => void;
};

const IconButton: React.FC<PropsType> = ({ ico, title, secondRow, customIconClasses, onClick }) => {
  const customIconContainer = classNames(customIconClasses);

  const onclickHandler = () => {
    onClick && onClick();
  };

  return (
    <div className={classes.container} onClick={onclickHandler}>
      <div className={classes.iconColumn}>
        <div className={classNames({ [customIconContainer]: customIconContainer })}>
          {secondRow ? (
            <div className={classes.bigIconContainer}>
              <img src={ico} alt="" />
            </div>
          ) : (
            <div className={classes.iconContainer}>
              <img src={ico} alt="" />
            </div>
          )}
        </div>
      </div>
      {secondRow ? (
        <div className={classes.twoLineContainer}>
          <div className={classes.title}>{title}</div>
          <div className={classes.secondRow}>{secondRow}</div>
        </div>
      ) : (
        <div className={classes.titleContainer}>
          <div className={classes.title}>{title}</div>
        </div>
      )}
    </div>
  );
};

export default IconButton;
