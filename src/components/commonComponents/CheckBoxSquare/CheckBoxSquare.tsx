import React, { useRef, useState } from 'react';
import classes from './CheckBoxSquare.module.css';
import checkStatusIco from '../../../img/checkStatusIco.svg';
import classNames from 'classnames';

type PropsType = {
  id: number;
  title: string;
  checked: boolean;
  onSelect: (id: number) => void;
  amount?: number;
  toolTip?: string;
};

const CheckBoxSquare: React.FC<PropsType> = ({ id, title, checked, onSelect, amount, toolTip }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showToolTip, setShowToolTip] = useState(false);
  let timeOutId: NodeJS.Timeout;

  const onClick = () => {
    onSelect(id);
  };

  const setTimeOutId = () => {
    timeOutId = setTimeout(() => {
      setShowToolTip(true);
    }, 750);
  };

  const onMouseEnterHandler = () => {
    if (!showToolTip) {
      setTimeOutId();
    }
  };

  const onMouseLeaveHandler = () => {
    setShowToolTip(false);
    clearTimeout(timeOutId);
  };

  const topValue = id * 32 + 118 + 'px';
  const leftValue = ref.current?.offsetWidth ? 100 + ref.current?.offsetWidth + 'px' : '0';

  return (
    <div className={classes.container}>
      {checked ? (
        <div className={classes.checkedBox} onClick={onClick}>
          <img src={checkStatusIco} className={classes.checkStatusIco} alt="check status ico" />
        </div>
      ) : (
        <div className={classes.box} onClick={onClick} />
      )}
      <div className={classes.title} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
        <div className={classNames({ [classes.constantWidth]: amount })} ref={ref}>
          {title}
        </div>
        {amount && <div className={classes.amountTitle}>&nbsp;&nbsp;{amount}</div>}
        {toolTip && showToolTip && (
          <div className={classes.toolTip} style={{ top: topValue, left: leftValue }}>
            {toolTip}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckBoxSquare;
