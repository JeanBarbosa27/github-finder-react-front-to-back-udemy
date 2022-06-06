import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import AlertState from './contexts/alert/AlertState';
import GithubState from './contexts/github/GithubState';

import About from './pages/About';
import Home from './pages/Home';
import User from './pages/User';
import NotFound from './pages/NotFound';

import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';

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
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/user/:login" element={<User />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
