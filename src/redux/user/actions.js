import * as action from './constants';

export function logIn(name, password) {
  return {
    type: action.LOG_IN,
    name,
    password,
  };
}

export function logInSuccess(id, login) {
  return {
    type: action.LOG_IN_SUCCESS,
    login,
    id,
  };
}

export function logOut() {
  return {
    type: action.LOG_OUT,
  };
}
