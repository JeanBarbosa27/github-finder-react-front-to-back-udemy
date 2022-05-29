import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Search extends Component {
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  }

  state = {
    text: '',
  }

  onChange = ({ target: { name, value }}) => this.setState({ [name]: value });

  onSubmit = (event) => {
    event.preventDefault();
    const { text } = this.state;

    if(!text) {
      this.props.setAlert('Please write something to search.', 'ligth');
      return;
    }

    this.props.searchUsers(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    const { clearUsers, showClearButton } = this.props;

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <input
          type="text"
          name="text"
          id="searchUser"
          placeholder="Type the username you want to search"
          value={this.state.text}
          onChange={this.onChange}
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
}

export default Search
