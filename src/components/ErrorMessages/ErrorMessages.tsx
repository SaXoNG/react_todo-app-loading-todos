import React from 'react';
import cn from 'classnames';

type Props = {
  errorMessage: boolean;
  setError: (error: boolean) => void;
};

export const ErrorMessages: React.FC<Props> = ({ errorMessage, setError }) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: errorMessage,
      })}
    >
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError(true)}
      />
      {/* show only one message at a time */}
      Unable to load todos
      <br />
      Title should not be empty
      <br />
      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
