import React, { useCallback, useRef } from 'react';
import classes from './PopUp.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { hidePopUp, selectorShowPopUp } from '../../store/appSlice';
import ButtonComponent, { ButtonType } from '../commonComponents/ButtonComponent/ButtonComponent';
import { clearFormAfterSubmit } from '../../utils/functions';
import { createRoot } from 'react-dom/client';

type PropsType = {
  popUpContent: React.ReactNode;
  titleConfirmBtn?: string;
  onClosePopUp?: (result?: boolean | FormData) => void;
  hideCancelBottomBtn?: boolean;
  customBottomBtn?: React.ReactNode;
  customBottomBtnThree?: React.ReactNode;
  customClassBottomBtnGroup?: string;
};

const PopUp: React.FC<PropsType> = ({
  popUpContent,
  titleConfirmBtn,
  onClosePopUp,
  hideCancelBottomBtn,
  customBottomBtn,
  customBottomBtnThree,
  customClassBottomBtnGroup,
}) => {
  const dispatch = useAppDispatch();
  const showPopUp = useAppSelector(selectorShowPopUp);
  const formRef = useRef<HTMLFormElement | null>(null);

  const closePopUp = useCallback(() => {
    const form = formRef?.current;
    form && form.reset();
    onClosePopUp && onClosePopUp();
    dispatch(hidePopUp());
  }, [dispatch, onClosePopUp]);

  const confirmPopUp = useCallback(() => {
    const form = formRef?.current;
    if (form && form.checkValidity()) {
      onClosePopUp && onClosePopUp(new FormData(form));
      clearFormAfterSubmit(form!);
      setTimeout(() => {
        dispatch(hidePopUp());
      }, 0);
    }
  }, [dispatch, onClosePopUp]);

  const customClassBtnGroup = classNames(customClassBottomBtnGroup);

  if (!showPopUp) {
    return null;
  }

  return (
    <div className={classes.container} onClick={closePopUp}>
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
          {hideCancelBottomBtn}
          <button className={classes.topCloseBtn} onClick={closePopUp} type="reset">
            &times;
          </button>
          {popUpContent}
          <div className={classNames(classes.btnGroups, { [customClassBtnGroup]: customClassBottomBtnGroup })}>
            <ButtonComponent
              title={titleConfirmBtn ? titleConfirmBtn : 'Подтвердить'}
              onClick={confirmPopUp}
              type="submit"
            />
            {!hideCancelBottomBtn && (
              <ButtonComponent title="Отмена" onClick={confirmPopUp} buttonType={ButtonType.SECONDARY} type="reset" />
            )}
            {customBottomBtn && customBottomBtn}
            {customBottomBtnThree && customBottomBtnThree}
          </div>
        </form>
      </div>
    </div>
  );
};

export const showPopUp = () => {
  const div = document.createElement('div');
  div.id = 'popup' + new Date().getTime();
  document.body.append(div);

  const popUpContainer = document.getElementById(div.id)!;
  const rootPopUp = createRoot(popUpContainer);
  rootPopUp.render(<ButtonComponent title={'Ok'} />);
};

export default PopUp;
