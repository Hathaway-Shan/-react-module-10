import { useContext, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { authUser } from '../../services/auth';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { type } = useParams();

  const { user, setUser } = useContext(UserContext);

  const submitAuth = async () => {
    const userResp = await authUser(email, password, type);
    setUser(userResp);
    //reset inputs
    setEmail('');
    setPassword('');
  };
  //redirect to tasks goes here
  if (user) {
    return <Redirect to="/todos" />;
  }

  return (
    <div className="auth box">
      <nav className="panel is-success">
        <div className="panel-block">
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon is-small is-left"></span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="icon is-small is-left"></span>
            </div>
          </div>
        </div>
        <div className="control">
          <button onClick={submitAuth} className="button">
            Submit
          </button>
        </div>
      </nav>
    </div>
  );
}
