import * as action from './constants';

export function getNews() {
  return {
    type: action.GET_NEWS,
  };
}

export function getAllNewSuccess(news) {
  return {
    type: action.GET_ALL_NEWS_SUCCESS,
    news,
  };
}

export function getNewsByUserSuccess(news) {
  return {
    type: action.GET_NEWS_BY_USER_SUCCESS,
    news,
  };
}

export function filterNews(searchStr) {
  return {
    type: action.FILTER_NEWS,
    searchStr,
  };
}

export function clearNews() {
  return {
    type: action.CLEAR_NEWS,
  };
}

export function createNews(title, text) {
  return {
    type: action.CREATE_NEWS,
    title,
    text,
  };
}

export function deleteNews(id) {
  return {
    type: action.DELETE_NEWS,
    id,
  };
}

export function updateNews(news) {
  return {
    type: action.UPDATE_NEWS,
    news,
  };
}
