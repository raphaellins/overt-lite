import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Account from './pages/Account';
import Lottery from './pages/Lottery';
import Game from './pages/Game';
import NewDraw from './pages/NewDraw';

ReactDOM.render(
  (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Lottery} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/draw" component={NewDraw} />
          <Route  exact path="/login" component={Login} />
          <Route  exact path="/account" component={Account} />
        </Switch>
      </App>
    </Router>
  ),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
