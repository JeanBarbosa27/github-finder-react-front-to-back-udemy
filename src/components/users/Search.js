import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Search extends Component {
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  }

  state = {
    text: '',
  }

  onChange = ({ target: { name, value }}) => this.setState({ [name]: value });

  onSubmit = (event) => {
    event.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({ text: '' });
  }

  render() {
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
      </form>
    )
  }
}

export default Search
