import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Auth from './Auth/Auth';

function App() {
  return (
    <div className="App">
      <div>this is app</div>
      <Switch>
        <Route path="/auth/:type" component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
