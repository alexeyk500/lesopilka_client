import React, { useRef, useState } from 'react';
import classes from './CheckBoxSquare.module.css';
import checkStatusIco from '../../../img/checkStatusIco.svg';
import classNames from 'classnames';
import { SHOW_TOOLTIP_TIMEOUT } from '../../../utils/constants';

type PropsType = {
  id: number;
  title: string;
  checked: boolean;
  onSelect: (id: number) => void;
  amount?: number;
  toolTip?: string;
  toolTipVerticalShift?: number;
  dataTestId?: string;
};

const CheckBoxSquare: React.FC<PropsType> = ({
  id,
  title,
  checked,
  onSelect,
  amount,
  toolTip,
  toolTipVerticalShift = 0,
  dataTestId,
}) => {
  const refContainer = useRef<HTMLDivElement | null>(null);
  const refTitle = useRef<HTMLDivElement | null>(null);

  const [showToolTip, setShowToolTip] = useState(false);
  let timeOutId: NodeJS.Timeout;

  const onClick = () => {
    onSelect(id);
  };

  const setTimeOutId = () => {
    timeOutId = setTimeout(() => {
      setShowToolTip(true);
    }, SHOW_TOOLTIP_TIMEOUT);
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

  const topValue = id * 32 + toolTipVerticalShift + 'px';
  const leftValue =
    refContainer.current && refTitle.current
      ? 55 + refContainer.current?.offsetLeft + refTitle.current?.offsetWidth + 'px'
      : '0';

  return (
    <div ref={refContainer} className={classes.container}>
      <button className={classes.button} onClick={onClick} data-test-id={dataTestId}>
        {checked ? (
          <div className={classes.checkedBox}>
            <img src={checkStatusIco} alt="check status ico" />
          </div>
        ) : (
          <div className={classes.box} />
        )}
      </button>

      <div className={classes.title} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
        <div ref={refTitle} className={classNames({ [classes.constantWidth]: amount !== undefined })}>
          {title}
        </div>
        {amount !== undefined && <div className={classes.amountTitle}>&nbsp;&nbsp;{amount}</div>}
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
