import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import About from './pages/About';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import User from './pages/User';
import Users from './components/users/Users';

const App = () => {
  const [alert, setAlert] = useState(null);
  const [emptyListMessage, setEmptyListMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);

  const axiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 10000,
  });
  const clientId = process.env.REACT_APP_GITHUB_FINDER_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_GITHUB_FINDER_CLIENT_SECRET
  const authQuery = `client_id=${clientId}&client_secret${clientSecret}`;

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      const res = await axiosInstance.get(`users?client_id=${authQuery}`);
      setLoading(false);
      setUsers(res.data);
    }
    fetchUsers();
  }, []);

  const setAlertAsError = (message) => setAlert({ message, type: 'danger'});

  const searchUsers = async (searchText) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`search/users?q=${searchText}&${authQuery}`);
      setLoading(false);
      setUsers(res.data.items);
      setEmptyListMessage(res.data.items.length ? '' : `No users found for: ${searchText}!`);
    } catch(error) {
      setUsers([]);
      setLoading(false);
      setAlertAsError(error.message);
    }
  }

  const getUser = async (userLogin) => {
    try {
      setLoading(false);
      const res = await axiosInstance.get(`users/${userLogin}?${authQuery}`);
      setLoading(false);
      setUser(res.data);
    } catch(error) {
      setUser({});
      setLoading(false);
      setAlertAsError(error.message);
    }
  }

  const getUserRepos = async (userLogin) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `users/${userLogin}/repos?per_page=5&sort=created:asc&${authQuery}`
      );

      setLoading(false);
      setRepos(res.data);
    } catch(error) {
      setLoading(false);
      setAlertAsError(error.message);
    }
  }

  const clearUsers = () => {
    setLoading(false);
    setEmptyListMessage('');
    setUsers([]);
  }

  const showAlert = (message, type) => {
    setAlert({ message, type });

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={(
              <Fragment>
                <Search
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  showClearButton={!!users.length}
                  setAlert={showAlert}
                  />
                <Users
                  loading={loading}
                  users={users}
                  emptyListMessage={emptyListMessage}
                />
              </Fragment>
            )} />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/user/:login"
              element={
                <User
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  userData={user}
                  loading={loading}
                  repos={repos}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
