import { useEffect, useState } from 'react';
import { getListItems } from '../services/todos';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getListItems();
        setTodos(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.message);
      }
    };
    fetchTodos();
  }, []);
  return { todos, setTodos };
}
