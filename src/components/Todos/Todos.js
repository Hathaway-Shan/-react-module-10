import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
//todos imports
import { useTodos } from '../../hooks/useTodos';
import { createListItem, deleteTodo } from '../../services/todos';

export default function Todos() {
  const [todo, setTodo] = useState('');
  const { todos, setTodos } = useTodos();

  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  const handleAddTodo = async () => {
    try {
      const newTodo = await createListItem(todo);
      setTodos((prev) => [...prev, newTodo]);
      setTodo('');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  const handleRemove = async (id) => {
    const deletedItem = await deleteTodo(id);
    setTodos((prevState) => prevState.filter((prevTodo) => prevTodo.id !== deletedItem.id));
  };

  return (
    <div>
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.description}</span>
            <button className="deleteTodo" onClick={() => handleRemove(todo.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
