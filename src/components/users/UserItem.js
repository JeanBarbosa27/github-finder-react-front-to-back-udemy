import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const UserItem = ({ user }) => {
  const { avatar_url, login, html_url } = user;
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt={`${login} avatar`}
        className="round-img"
        style={{ width: '60px'}}
      />
      <p>{login}</p>
      <Link
        to={`/user/${login}`}
        className="btn btn-dark btn-sm my-1"
        state={{ userLogin: login }}
      >More</Link>
    </div>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem
