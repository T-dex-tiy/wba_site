import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Callback from './Callback';
import Home from './Home'
import Auth from './Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <BrowserRouter history={history} component={App}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
           <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
           <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </div>
      </BrowserRouter>
  );
}
