import React, { useCallback, useRef } from 'react';
import classes from './PopUp.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { hidePopUp, selectorShowPopUp } from '../../store/appSlice';

type PropsType = {
  popUpContent: React.ReactNode;
  onClosePopUp?: (result?: boolean | FormData) => void;
};

const PopUp: React.FC<PropsType> = ({ popUpContent, onClosePopUp }) => {
  const dispatch = useAppDispatch();
  const showPopUp = useAppSelector(selectorShowPopUp);

  const formRef = useRef<HTMLFormElement | null>(null);

  const closePopUp = useCallback(() => {
    onClosePopUp && onClosePopUp();
    dispatch(hidePopUp());
  }, [dispatch, onClosePopUp]);

  const confirmPopUp = useCallback(() => {
    const form = formRef?.current;
    if (form && form.checkValidity()) {
      onClosePopUp && onClosePopUp(new FormData(form));
    } else {
      onClosePopUp && onClosePopUp();
    }
    dispatch(hidePopUp());
  }, [dispatch, onClosePopUp]);

  return (
    <div className={classNames(classes.container, { [classes.isShow]: showPopUp })} onClick={closePopUp}>
      <div
        className={classes.content}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {popUpContent}
          <button onClick={confirmPopUp} type="submit">
            Ok
          </button>
          <button onClick={closePopUp} type="submit">
            &times;
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
