import * as actions from './constants';

const initialState = {
  news: [],
  draftNews: [],
};

export function newsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_NEWS_SUCCESS: {
      return {
        ...state,
        news: action.news,
      };
    }
    case actions.GET_NEWS_BY_USER_SUCCESS: {
      return {
        ...state,
        draftNews: action.news,
      };
    }
    case actions.CLEAR_NEWS: {
      return {
        ...state,
        news: [],
        draftNews: [],
      };
    }
    default:
      return state;
  }
}

export * from './actions';
export * from './selectors';
