import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentTodos: Todo[];
  title: string;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const FormField: React.FC<Props> = ({
  onSubmit,
  onChangeInput,
  currentTodos,
  title,
  inputRef,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {currentTodos.length > 0 && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={onChangeInput}
        />
      </form>
    </header>
  );
};
