import React, { useState } from 'react';
import classes from './NewOrderMessage.module.css';
import classNames from 'classnames';
import { MAX_MESSAGE_LENGTH } from '../../../../utils/constants';
import ButtonComponent, { ButtonType } from '../../ButtonComponent/ButtonComponent';

type PropsType = {
  sendNewOrderMessage: (message: string) => void;
  isOrderForManufacturer?: boolean;
  showDelimiter?: boolean;
};

const NewOrderMessage: React.FC<PropsType> = ({ sendNewOrderMessage, isOrderForManufacturer, showDelimiter }) => {
  const [message, setMessage] = useState<string>('');

  const onChangeInput: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.currentTarget.value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(event.currentTarget.value);
    }
  };

  const onClickSendMessage = () => {
    if (sendNewOrderMessage) {
      sendNewOrderMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={classes.container}>
      {showDelimiter && <div className={classes.delimiter} />}
      <div className={classes.content}>
        <div className={classes.infoRow}>
          <div className={classNames(classes.userTitle)}>{isOrderForManufacturer ? 'Поставщик' : 'Покупатель'}</div>
        </div>
        <div className={classes.textareaContainer}>
          <div className={classNames(classes.textareaTitle, { [classes.manufacturerColor]: isOrderForManufacturer })}>
            <div className={classes.row}>
              <div className={classes.expandPart}>
                {`Здесь вы можете написать сообщение ${
                  isOrderForManufacturer ? 'покупателю' : 'поставщику'
                } (максимум ${MAX_MESSAGE_LENGTH} символов)`}
              </div>
              <div>{`${message ? message.length : 0} / ${MAX_MESSAGE_LENGTH}`}</div>
            </div>
          </div>
          <textarea className={classes.customSizeInput} value={message} onChange={onChangeInput} />
        </div>
        <div className={classes.buttonSendContainer}>
          <div className={classes.buttonSend}>
            <ButtonComponent
              title={'Отправить'}
              buttonType={ButtonType.SECONDARY}
              onClick={onClickSendMessage}
              disabled={message.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderMessage;
