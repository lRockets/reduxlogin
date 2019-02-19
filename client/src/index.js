import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';
import NavigationBar from './components/NavigationBar';
// import registerServiceWorker from './registerServiceWorker';

import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';

import './bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

import { Provider } from 'react-redux';

import FlashMessage from './components/flashMessage/flashMessage';
import jwtDecode from 'jwt-decode';   //解析token的库
import setAuthorizationToken from './untils/setAuthorizationToken';
import { setCurrentUser } from './actions/loginActions';
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={ store }>
    <Router routes={ routes }>
      <div>
        <NavigationBar />
        <FlashMessage />
        { routes }
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();