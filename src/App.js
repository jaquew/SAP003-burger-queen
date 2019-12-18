import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Button from './components/Button'
import Hall from './pages/Hall'
import Kitchen from './pages/Kitchen'

//grow-alert biblioteca github


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/hall">Hall</Link>
            </li>
            <li>
            <Link to="/kitchen">Cozinha</Link>
            </li>
          </ul>
        </nav>
      <Switch>
        <Route path="/hall" component={Hall}/>
        <Route path="/kitchen">
          <Kitchen />
        </Route>
        {/* <Route exact path="/">
          <App />
        </Route> */}
  
      </Switch>
      </div>
    </Router>
  );
}

export default App;
