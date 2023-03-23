import React, { useState } from 'react';
import classes from './OrderSubSectionSelector.module.css';
import { ReactComponent as SelectorArrowIco } from '../../img/selectorArrow.svg';
import classNames from 'classnames';

type PropsType = {
  title: string;
  isOpen?: boolean;
  onClick?: (value: boolean) => void;
  children: React.ReactElement;
};

const OrderSubSectionSelector: React.FC<PropsType> = ({ title, isOpen, onClick, children }) => {
  const [showContent, setIsShowContent] = useState<boolean>(isOpen ? isOpen : true);

  const onClickHandler = () => {
    setIsShowContent((prevState) => {
      onClick && onClick(prevState);
      return !prevState;
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.row} onClick={onClickHandler}>
        <div className={classes.title}>{`${title}`}</div>
        <SelectorArrowIco className={classNames(classes.selectorArrowIco, { [classes.rotate]: showContent })} />
      </div>
      {showContent && children}
    </div>
  );
};

export default OrderSubSectionSelector;
