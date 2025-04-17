import React, { useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  activeTodos: number;
  todosFromServer: Todo[];
  filteredTodosSetter: (filteredTodo: Todo[]) => void;
};

type FilterParam = 'all' | 'active' | 'completed';

export const Footer: React.FC<Props> = ({
  activeTodos,
  todosFromServer,
  filteredTodosSetter,
}) => {
  const selectedFilter = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (selectedFilter.current) {
      selectedFilter.current.classList.add('selected');
    }
  }, []);

  const filter = (
    todos: Todo[],
    filterParam: FilterParam,
  ): React.MouseEventHandler<HTMLAnchorElement> => {
    return event => {
      event.preventDefault();

      if (selectedFilter.current) {
        selectedFilter.current.classList.remove('selected');
      }

      event.currentTarget.classList.add('selected');
      selectedFilter.current = event.currentTarget;

      switch (filterParam) {
        case 'all':
          filteredTodosSetter(todos);
          break;

        case 'active':
          filteredTodosSetter(todos.filter(todo => !todo.completed));
          break;

        case 'completed':
          filteredTodosSetter(todos.filter(todo => todo.completed));
          break;

        default:
          filteredTodosSetter(todos);
      }
    };
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos}items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className="filter__link"
          data-cy="FilterLinkAll"
          ref={selectedFilter}
          onClick={filter(todosFromServer, 'all')}
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          data-cy="FilterLinkActive"
          onClick={filter(todosFromServer, 'active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
          onClick={filter(todosFromServer, 'completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
