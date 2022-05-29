import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';

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
    error: false,
    errorMessage: '',
    loading: false,
    users: [],
  }

  searchUsers = async (userLogin) => {
    try {
      this.setState({ loading: true });
      const res = await this.axiosInstance.get(
        `search/users?q=${userLogin}&${this.authQuery}`
      );
      this.setState({ loading: false, users: res.data.items });
    } catch(error) {
      this.setState({
        users: [],
        loading: false,
        error: true,
        errorMessage: error.message
      });
    }
  }

  async componentDidMount() {
    this.setState({loading: true});
    const res = await this.axiosInstance.get(`users?client_id=${this.authQuery}`);
    this.setState({ loading: false, users: res.data });
  }

  render () {
    const { error, errorMessage, loading, users } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          {error && <p className="text-danger text-center">{errorMessage}</p>}
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
