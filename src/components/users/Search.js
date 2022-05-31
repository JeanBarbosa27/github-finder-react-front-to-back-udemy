import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Search = ({ setAlert, searchUsers, clearUsers, showClearButton }) => {
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
        showClearButton && (
          <button
            type="button"
            className="btn btn-light btn-block"
            onClick={clearUsers}
          >Clear</button>
      )}
    </form>
  )
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClearButton: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default Search
