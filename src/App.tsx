/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, postTodo, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FormField } from './components/FormField';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessages } from './components/ErrorMessages';

const creatingTodoId = (todos: Todo[]): number => {
  const todosId: number[] = todos.map(todo => todo.id);

  if (todos.length === 0) {
    return 1;
  }

  return Math.max(...todosId) + 1;
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [newTodoLoader, setNewTodoLoader] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos().then(todos => setCurrentTodos(todos));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const newTodo = {
    id: creatingTodoId(currentTodos),
    userId: USER_ID,
    title: title,
    completed: false,
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNewTodoLoader(true);
    postTodo(newTodo);

    setTimeout(() => {
      setNewTodoLoader(false);

      setCurrentTodos([...currentTodos, newTodo]);
      setTitle('');
    }, 500);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <FormField
          onChangeInput={handleInputChange}
          onSubmit={addTodo}
          currentTodos={currentTodos}
          title={title}
          inputRef={inputRef}
        />

        <TodoList
          todos={currentTodos}
          setTodos={setCurrentTodos}
          currentTitle={title}
          newTodoLoading={newTodoLoader}
          inputRef={inputRef}
        />

        {currentTodos.length > 0 && <Footer />}
      </div>

      <ErrorMessages />
    </div>
  );
};
