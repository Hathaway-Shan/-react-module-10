import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';

export default function Header() {
  // const [isActive, setIsActive] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  return (
    <nav>
      <h1>My Todo App</h1>

      <div className="nav">
        {!user && (
          <nav>
            <div className="buttons">
              <div>
                <NavLink className="link1" to="/auth/sign-up">
                  Sign Up
                </NavLink>
              </div>
              <div>
                <NavLink className="link2" to="/auth/sign-in">
                  Sign In
                </NavLink>
              </div>
            </div>
          </nav>
        )}
        {user && (
          <>
            <div>hello {user.email}</div>
            <button className="button is-light" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        )}
      </div>

      {}
    </nav>
  );
}
