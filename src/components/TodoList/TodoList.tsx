import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  currentTitle: string;
  newTodoLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  currentTitle,
  newTodoLoading,
  inputRef,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <TodoInfo
            todo={todo}
            key={todo.id}
            setTodos={setTodos}
            currentTodos={todos}
            inputRef={inputRef}
          />
        );
      })}
      {newTodoLoading && (
        <div data-cy="Todo" className="todo">
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
            {''}
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {currentTitle}
          </span>

          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};
