import React, { ReactElement, useEffect, useRef, useState } from 'react';
import classes from './ToolTip.module.css';
import { CSSTransition } from 'react-transition-group';
import { HIDE_TOOLTIP_TIMEOUT, SHOW_TOOLTIP_TIMEOUT } from '../../../utils/constants';

const transitionClasses = {
  enter: classes.exampleEnter,
  enterActive: classes.exampleEnterActive,
  exit: classes.exampleExit,
  exitActive: classes.exampleExitActive,
};

type PropsType = {
  children: ReactElement;
  text: string;
  customClass?: string;
};

const ToolTip: React.FC<PropsType> = ({ children, customClass, text }) => {
  const refSetTimeout = useRef<NodeJS.Timeout>();
  const [showToolTip, setShowToolTip] = useState(false);
  let toolTipClasses = customClass ? `${classes.toolTip} ${customClass}` : `${classes.toolTip}`;

  const onMouseEnter = () => {
    refSetTimeout.current = setTimeout(() => {
      setShowToolTip(true);
    }, SHOW_TOOLTIP_TIMEOUT);
  };

  const onMouseLeave = () => {
    clearTimeout(refSetTimeout.current);
    setShowToolTip(false);
  };

  useEffect(() => {
    if (showToolTip) {
      refSetTimeout.current = setTimeout(() => {
        setShowToolTip(false);
      }, HIDE_TOOLTIP_TIMEOUT);
    }
  }, [showToolTip]);

  return (
    <div className={classes.container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
      <CSSTransition in={showToolTip} timeout={350} classNames={transitionClasses} unmountOnExit>
        <div className={toolTipClasses}>{text}</div>
      </CSSTransition>
    </div>
  );
};

export default ToolTip;
