import React, { useCallback, useRef } from 'react';
import classes from './PopUp.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { hideLoginPopUp, selectorUserIsShowLoginPopUp } from '../../store/userSlice';

type PropsType = {
  popUpContent: React.ReactNode;
  onClosePopUp?: (result?: boolean | FormData) => void;
  // onClose?: ()=>void;
};

const PopUp: React.FC<PropsType> = ({ popUpContent, onClosePopUp }) => {
  const dispatch = useAppDispatch();
  const isShow = useAppSelector(selectorUserIsShowLoginPopUp);

  const formRef = useRef<HTMLFormElement | null>(null);

  const closePopUp = useCallback(() => {
    onClosePopUp && onClosePopUp();
    dispatch(hideLoginPopUp());
  }, [onClosePopUp]);

  const confirmPopUp = useCallback(() => {
    const form = formRef?.current;
    if (form && form.checkValidity()) {
      onClosePopUp && onClosePopUp(new FormData(form));
    } else {
      onClosePopUp && onClosePopUp();
    }
    dispatch(hideLoginPopUp());
  }, [onClosePopUp]);

  return (
    <div className={classNames(classes.container, { [classes.isShow]: isShow })} onClick={closePopUp}>
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
