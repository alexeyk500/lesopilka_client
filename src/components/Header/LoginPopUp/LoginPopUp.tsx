import React from 'react';
import classNames from 'classnames';
import classes from './LoginPopUp.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { hideLoginPopUp, selectorUserIsShowLoginPopUp } from '../../../store/userSlice';

const LoginPopUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const isShow = useAppSelector(selectorUserIsShowLoginPopUp);

  const closePopUp = () => {
    dispatch(hideLoginPopUp());
  };

  return (
    <div className={classNames(classes.container, { [classes.isShow]: isShow })} onClick={closePopUp}>
      <div
        className={classes.content}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <div style={{ marginTop: 24, marginBottom: 64, fontWeight: 600 }}>PopUpForm</div>
        <button>Ok</button>
        <button onClick={closePopUp}>&times;</button>
      </div>
    </div>
  );
};

export default LoginPopUp;
