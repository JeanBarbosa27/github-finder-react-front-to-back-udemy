import React, { Component } from 'react'
import PropTypes from 'prop-types'

class User extends Component {
  static propTypes = {
    userData: PropTypes.object,
    getUser: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const userLogin = window.location.pathname.split('/')[2];
    this.props.getUser(userLogin);
  }
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.userData;

    return (
      <div>User: {name} </div>
    )
  }
}

export default User
