import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import AlertState from './contexts/alert/AlertState';
import GithubState from './contexts/github/GithubState';
import About from './pages/About';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import User from './pages/User';
import Users from './components/users/Users';

const App = () => {
  return (
    <GithubState>
      <AlertState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert />
            <Routes>
              <Route exact path="/" element={(
                <Fragment>
                  <Search />
                  <Users />
                </Fragment>
              )} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/user/:login" element={<User />} />
            </Routes>
          </div>
        </div>
      </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
