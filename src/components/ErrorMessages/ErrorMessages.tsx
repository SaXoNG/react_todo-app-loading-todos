import React, { useState } from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
};

export const ErrorMessages: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  const [hideMessage, setHideMessage] = useState(false);
  const something = () => {
    setHideMessage(true);

    setTimeout(() => {
      setErrorMessage('');
      setHideMessage(false);
    }, 1000);
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: hideMessage,
      })}
    >
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={something}
      />
      {/* show only one message at a time */}
      {errorMessage}
      {/* <br />
      Unable to update a todo */}
    </div>
  );
};
