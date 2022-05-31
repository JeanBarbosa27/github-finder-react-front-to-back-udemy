import React, { useReducer } from 'react';
import axios from 'axios';

import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  CLEAR_USERS,
  GET_USER,
  GET_USERS,
  GET_USER_REPOS,
  SEARCH_USERS,
  SET_LOADING,
} from '../types';

const GithubState = (props) => {
  const initialState = {
    alert: null,
    emptyListMessage: '',
    loading: false,
    user: {},
    users: [],
    repos: [],
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  const setLoading = () => dispatch({ type: SET_LOADING });

  const axiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 10000,
  });
  const clientId = process.env.REACT_APP_GITHUB_FINDER_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_GITHUB_FINDER_CLIENT_SECRET
  const authQuery = `client_id=${clientId}&client_secret${clientSecret}`;

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const getUsers = async() => {
    setLoading();
    const res = await axiosInstance.get(`users?client_id=${authQuery}`);
    dispatch({ type: GET_USERS, payload: res.data });
  }

  const getUser = async (userLogin) => {
    setLoading();
    const res = await axiosInstance.get(`users/${userLogin}?${authQuery}`);
    dispatch({ type: GET_USER, payload: res.data });
  }

  const getUserRepos = async (userLogin) => {
    setLoading();
    const res = await axiosInstance.get(
      `users/${userLogin}/repos?per_page=5&sort=created:asc&${authQuery}`
    );
    dispatch({ type: GET_USER_REPOS, payload: res.data });
  }

  const searchUsers = async (searchText) => {
    setLoading();
    const res = await axiosInstance.get(`search/users?q=${searchText}&${authQuery}`);
    dispatch({ type: SEARCH_USERS, payload: { users: res.data.items, searchText }});
  }

  return (
    <GithubContext.Provider
      value={{
        alert: state.alert,
        emptyListMessage: state.emptyListMessage,
        loading: state.loading,
        user: state.user,
        users: state.users,
        repos: state.repos,
        clearUsers,
        searchUsers,
        getUser,
        getUsers,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState;
