import * as actions from './constants';

const initialState = {
  isLoading: false,
  error: null,
};

export function systemReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_ERROOR_MESSAGE: {
      return {
        ...state,
        error: action.value,
      };
    }
    case actions.SET_LOADING_STATUS: {
      return {
        ...state,
        isLoading: action.value,
      };
    }
    default:
      return state;
  }
}

export * from './actions';
export * from './selectors';
