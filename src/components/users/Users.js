import React, { useEffect, useContext } from 'react';

import GithubContext from '../../contexts/github/githubContext';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

const Users = () => {
  const { users, getUsers, loading, emptyListMessage } = useContext(GithubContext);

  useEffect(() => {
    const fetchUsers = async() => await getUsers();
    fetchUsers();
  }, []);

  if(loading) {
    return <Spinner />
  }

  if(!users.length && emptyListMessage) {
    return (
      <p className="text-center text-danger my-3">
        <strong>{emptyListMessage}</strong>
      </p>
    )
  }

  return (
    <ul className="list" style={usersStyle}>
      {users.map(user => (
        <li key={user.id}>
          <UserItem user={user} />
        </li>
      ))}
    </ul>
  )
}

const usersStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
}

export default Users
