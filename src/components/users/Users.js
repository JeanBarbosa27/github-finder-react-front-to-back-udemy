import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserItem from './UserItem'

class Users extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
  }

  render() {
    const { users } = this.props;

    return (
      <ul className="list" style={usersStyle}>
        {users.map(user => (
          <li key={user.id}>
            <UserItem
              user={user}
            />
          </li>
        ))}
      </ul>
    )
  }
}

const usersStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
}

export default Users
