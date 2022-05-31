import React, { useState, useContext } from 'react'

import AlertContext from '../../contexts/alert/alertContext';
import GithubContext from '../../contexts/github/githubContext';

const Search = () => {
  const { searchUsers, clearUsers, users  } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const [text, setText] = useState('');

  const onChange = ({ target: { value }}) => setText(value);

  const onSubmit = (event) => {
    event.preventDefault();
    if(!text) {
      return setAlert('Please write something to search.', 'ligth');
    }
    searchUsers(text);
    setText('');
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="text"
        name="text"
        id="searchUser"
        placeholder="Type the username you want to search"
        value={text}
        onChange={onChange}
      />
      <input type="submit" className="btn btn-dark btn-block" value="Search" />
      {
        !!users.length && (
          <button
            type="button"
            className="btn btn-light btn-block"
            onClick={clearUsers}
          >Clear</button>
      )}
    </form>
  )
}

export default Search
