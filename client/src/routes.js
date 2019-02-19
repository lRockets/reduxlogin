import React from 'react';

import { Route } from 'react-router-dom';
import App from './components/App';
import './App.css';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/loginPage/login';
import createEvent from './components/create/createEvent';
import detail from './components/detail/detail';
export default (
  <div className="container">
    <Route exact path="/" component={ App } />
    <Route path="/signup" component={ SignupPage } />
    <Route path="/login" component={ LoginPage } />
    <Route path="/create" component={ createEvent } />
    <Route path="/detail/:id" component={ detail } />
  </div>
)