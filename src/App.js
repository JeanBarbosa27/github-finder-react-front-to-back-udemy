import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
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
    const { alert, loading, users, emptyListMessage } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
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
        </div>
      </div>
    );
  }
}

export default App;
