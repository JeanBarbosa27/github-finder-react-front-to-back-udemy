import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

class App extends Component {
  state = {
    loading: false,
    users: [],
  }

  async componentDidMount() {
    const clientId = process.env.REACT_APP_GITHUB_FINDER_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_GITHUB_FINDER_CLIENT_SECRET

    this.setState({loading: true});
    const res = await axios.get(
      `https://api.github.com/users?client_id=${clientId}&client_secret=${clientSecret}`
    );
    this.setState({ loading: false, users: res.data });
  }

  render () {
    const { loading, users } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
