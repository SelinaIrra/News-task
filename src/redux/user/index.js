import * as actions from './constants';

const initialState = {
  login: '',
  id: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOG_IN_SUCCESS: {
      return {
        ...state,
        login: action.login,
        id: action.id,
      };
    }
    case actions.LOG_OUT: {
      return {
        ...state,
        login: '',
        id: null,
      };
    }
    default:
      return state;
  }
}

export * from './actions';
export * from './selectors';
