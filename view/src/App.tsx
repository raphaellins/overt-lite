import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';

function App() {
  return <Router>
  <div>
     <Switch>
         <Route exact path="/" component={home}/>
         <Route exact path="/login" component={Login}/>
         <Route exact path="/account" component={Account}/>
     </Switch>
  </div>
</Router>;
}

export default App;