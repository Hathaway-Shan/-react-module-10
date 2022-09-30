import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
//todos imports
import { useTodos } from '../../hooks/useTodos';
import { createListItem } from '../../services/todos';

export default function Todos() {
  const [todo, setTodo] = useState('');
  const { todos, setTodos } = useTodos();

  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  const handleNewItem = async () => {
    try {
      const newTodo = await createListItem(todo);
      setTodos((prev) => [...prev, newTodo]);
      setTodo('');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  return (
    <div>
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={handleNewItem}>Add Todo</button>
    </div>
  );
}
