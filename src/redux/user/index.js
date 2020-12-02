import * as actions from './constants';

const initialState = {
  login: '',
  id: null,
  role: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOG_IN_SUCCESS: {
      return {
        ...state,
        login: action.user.login,
        id: action.user.id,
        role: action.user.role,
      };
    }
    case actions.LOG_OUT: {
      return {
        ...state,
        login: '',
        id: null,
        role: null,
      };
    }
    default:
      return state;
  }
}

export * from './actions';
export * from './selectors';
