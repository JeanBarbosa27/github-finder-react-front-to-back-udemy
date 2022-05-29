import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

const Users = ({ loading, users  }) => {
  if(loading) {
    return <Spinner />
  }

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

Users.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
}

const usersStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
}

export default Users
