import * as action from './constants';

export function logIn(name, password) {
  return {
    type: action.LOG_IN,
    name,
    password,
  };
}

export function logInSuccess(user) {
  return {
    type: action.LOG_IN_SUCCESS,
    user,
  };
}

export function logOut() {
  return {
    type: action.LOG_OUT,
  };
}
