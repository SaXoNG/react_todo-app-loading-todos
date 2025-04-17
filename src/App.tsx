/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FormField } from './components/FormField';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const activeTodosAmount = todosFromServer.filter(
    todo => !todo.completed,
  ).length;

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
        setFilteredTodos(todos);
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <FormField />

        <TodoList currentTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}

        {todosFromServer.length > 0 && (
          <Footer
            activeTodos={activeTodosAmount}
            todosFromServer={todosFromServer}
            filteredTodosSetter={setFilteredTodos}
          />
        )}
      </div>

      <Notification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
