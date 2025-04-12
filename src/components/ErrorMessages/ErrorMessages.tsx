export const ErrorMessages = () => {
  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <button data-cy="HideErrorButton" type="button" className="delete" />
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
