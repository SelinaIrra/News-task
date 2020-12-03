import * as actions from './constants';

const initialState = {
  news: [],
  draftNews: [],
  isLastPage: false,
  offset: 0,
};

export function newsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_NEWS_SUCCESS: {
      return {
        ...state,
        news: action.offset ? [...state.news, ...action.news] : action.news,
      };
    }
    case actions.GET_NEWS_BY_USER_SUCCESS: {
      return {
        ...state,
        draftNews: action.offset ? [...state.draftNews, ...action.news] : action.news,
      };
    }
    case actions.CLEAR_NEWS: {
      return {
        ...state,
        news: [],
        draftNews: [],
      };
    }
    case actions.SET_LAST_PAGE: {
      return {
        ...state,
        isLastPage: action.value,
      };
    }
    case actions.SET_OFFSET: {
      return {
        ...state,
        offset: action.value,
      };
    }
    default:
      return state;
  }
}

export * from './actions';
export * from './selectors';
