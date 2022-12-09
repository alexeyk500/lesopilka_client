import React from 'react';
import classes from './IconButton.module.css';
import classNames from 'classnames';

type PropsType = {
  ico: string;
  title: string;
  customIconClasses?: string;
  onClick?: () => void;
};

const IconButton: React.FC<PropsType> = ({ ico, title, customIconClasses, onClick }) => {
  const customIconContainer = classNames(customIconClasses);

  const onclickHandler = () => {
    onClick && onClick();
  };

  return (
    <div className={classes.container} onClick={onclickHandler}>
      <div className={classes.iconColumn}>
        <div className={classNames({ [customIconContainer]: customIconContainer })}>
          <div className={classes.iconContainer}>
            <img src={ico} alt="" />
          </div>
        </div>
      </div>
      <div className={classes.titleContainer}>
        <div className={classes.title}>{title}</div>
      </div>
    </div>
  );
};

export default IconButton;
