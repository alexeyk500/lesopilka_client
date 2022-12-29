import React from 'react';
import classes from './OrderInfoSection.module.css';
import classNames from 'classnames';

type PropsType = {
  ico: string;
  title: string;
  infoFirstLine: string;
  infoSecondLine?: string;
  customIcoClasses?: string;
  customContainerClasses?: string;
};

const OrderInfoSection: React.FC<PropsType> = ({
  ico,
  title,
  infoFirstLine,
  infoSecondLine,
  customIcoClasses,
  customContainerClasses,
}) => {
  const customIcoClass = classNames(customIcoClasses);
  const customContainerClass = classNames(customContainerClasses);

  return (
    <div className={classNames(classes.container, { [customContainerClass]: customContainerClass })}>
      <div className={classNames(classes.icoContainer, { [customIcoClass]: customIcoClass })}>
        <img src={ico} className={classes.ico} alt="icon" />
      </div>
      <div className={classes.textInfoContainer}>
        <div className={classes.title}>{title}</div>
        <div className={classes.infoContainer}>
          <div className={classes.infoRow}>{infoFirstLine}</div>
          {infoSecondLine && <div className={classes.infoRow}>{infoSecondLine}</div>}
        </div>
      </div>
    </div>
  );
};

export default OrderInfoSection;
