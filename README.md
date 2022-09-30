# Todo list from Scratch planning artifacts

## Order of operations

### 1 Services create getUser function

- create auth component at the services layer

```js
import { client } from './client';

export function getUser() {
  return client.auth.currentUser;
}

export async function authUser(email, password, type) {
  let response;
  if (type === 'sign up') {
    response = await client.auth.signUp({ email, password });
  } else {
    response = await client.auth.signIn({ email, password });
  }
  return response.user;
}

export async function signOut() {
  await client.auth.signOut();
}
```

### 2 Context create UserProvider

- import get user and create UserContext and User provider in context component

```js
import { createContext, useState } from 'react';
//import getUser from services layer
import { getUser } from '../services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
```

### 3 Wrap app in index.js in UserProvider

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

### 4 Create Auth Component

- add type route and switch to app.js
- create state for email and password in auth
- use useParams hook to get type
- allows user to sign up

```js
const submitAuth = async () => {
  // TODO
  const userResp = await authUser(email, password, type);
  //set user
  setUser(userResp);
  //reset imputs
  setEmail('');
  setPassword('');
};
```

### 5 Create Dynamic Header component with Nav bar

- Nav bar shows links to sign in / sign up when user is not authenticated
- Nav bar shows current user and logout option if user is authenticated

```js
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
```

### 6 add Redirects

- Signed out users should be redirected to sign up sign in page

```js
if (!user) {
  return <Redirect to="/auth/sign-in" />;
}
```

- there should be a catch all route that redirects to the sign in page

```js
<Route path="*">
  <Redirect to="/auth/sign-up" />
</Route>
```

- if no user is detected on the sign in page they should be redirected to the sign in page
- once a user is signed in they should be redirected to the Todos page

### 7 Add Todo functionality

- Create Todo component in the services layer
- Create useTodos hook
-
- Authenticated users should see a list of todo items
- Authenticated users should be able to add items
- (stretch) users can mark todo items complete
- (stretch) users can delete todo items
