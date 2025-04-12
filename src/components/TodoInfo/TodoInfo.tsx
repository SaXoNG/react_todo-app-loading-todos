import { useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { deleteTodo } from '../../api/todos';

type Props = {
  todo: Todo;
  currentTodos: Todo[];
  setTodos: (todos: Todo[]) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  currentTodos,
  setTodos,
  inputRef,
}) => {
  const { id, title, completed } = todo;
  const [currentTitle, setCurrentTitle] = useState(title);
  const [editTodo, setEditingTodo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completedTodo, setCompletedTodo] = useState(completed);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setCurrentTitle(e.target.value);
  };

  const editingTodo = () => {
    setEditingTodo(true);
    inputRef.current?.focus();
  };

  const removeTodo = (todoId: number) => {
    setLoading(true);
    deleteTodo(todoId);
    const filterTodos: Todo[] = currentTodos.filter(
      someTodo => someTodo.id !== todoId,
    );

    setTimeout(() => {
      setTodos(filterTodos);
      inputRef.current?.focus();
    }, 500);
  };

  const checkingTodo = () => {
    setLoading(true);
    setTimeout(() => {
      if (completedTodo) {
        setCompletedTodo(false);
      } else {
        setCompletedTodo(true);
      }

      setLoading(false);
    }, 500);
  };

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: completedTodo,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={checkingTodo}
        />
        {''}
      </label>

      {editTodo ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={currentTitle}
            onChange={handleChange}
            autoFocus={true}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={editingTodo}
        >
          {currentTitle}
        </span>
      )}

      {!editTodo && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => removeTodo(id)}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          ' is-active': loading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
