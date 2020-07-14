import React from 'react';
import Terminal from './containers/Terminal/Terminal'
import SignIn from './components/SignIn/SignIn'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route path='/loading-screen' component={LoadingScreen} />
        <Route path='/terminal' component={Terminal}/>
      </Switch>
    </div>
  );
}

export default App;
