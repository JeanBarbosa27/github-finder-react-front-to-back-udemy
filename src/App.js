import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import About from './pages/About';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import User from './pages/User';
import Users from './components/users/Users';

class App extends Component {
  constructor() {
    super()
    this.axiosInstance = axios.create({
      baseURL: 'https://api.github.com',
      timeout: 10000,
    });
    this.clientId = process.env.REACT_APP_GITHUB_FINDER_CLIENT_ID;
    this.clientSecret = process.env.REACT_APP_GITHUB_FINDER_CLIENT_SECRET
    this.authQuery = `client_id=${this.clientId}&client_secret${this.client_secret}`;
  }

  state = {
    alert: null,
    emptyListMessage: '',
    loading: false,
    user: {},
    users: [],
  }

  searchUsers = async (searchText) => {
    try {
      this.setState({ loading: true });
      const res = await this.axiosInstance.get(
        `search/users?q=${searchText}&${this.authQuery}`
      );

      this.setState({
        loading: false,
        users: res.data.items,
        emptyListMessage: res.data.items.length ? '' : `No users found for: ${searchText}!`,
      });
    } catch(error) {
      this.setState({
        users: [],
        loading: false,
        alert: {
          message: error.message,
          type: 'danger',
        }
      });
    }
  }

  getUser = async (userLogin) => {
    try {
      this.setState({ loading: true });
      const res = await this.axiosInstance.get(`users/${userLogin}?${this.authQuery}`);

      this.setState({ loading: false, user: res.data });

    } catch(error) {
      this.setState({
        user: {},
        loading: false,
        alert: {
          message: error.message,
          type: 'danger',
        }
      })
    }
  }

  clearUsers = () => this.setState({ emptyListMessage: '', users: [], loading: false });

  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  async componentDidMount() {
    this.setState({loading: true});
    const res = await this.axiosInstance.get(`users?client_id=${this.authQuery}`);
    this.setState({ loading: false, users: res.data });
  }

  render () {
    const { alert, loading, users, user, emptyListMessage } = this.state;

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
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClearButton={!!this.state.users.length}
                    setAlert={this.setAlert}
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
                element={<User getUser={this.getUser} userData={user} />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
