import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function Todos() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  return <div>We are now in todos</div>;
}

UserContext;
