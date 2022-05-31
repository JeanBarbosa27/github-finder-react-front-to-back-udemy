import {
  CLEAR_USER,
  CLEAR_USERS,
  GET_USER,
  GET_USERS,
  GET_USER_REPOS,
  SEARCH_USERS,
  SET_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        emptyListMessage: '',
        loading: false,
      }

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      }

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      }

    case GET_USER_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      }

    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload.users,
        emptyListMessage: action.payload.users.length
          ? ''
          : `No users found for: ${action.payload.searchText}!`,
        loading: false,
      }

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }

    default:
      return state;
  }
}
