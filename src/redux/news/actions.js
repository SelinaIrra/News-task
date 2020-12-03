import * as action from './constants';

export function getNews(offset) {
  return {
    type: action.GET_NEWS,
    offset,
  };
}

export function getAllNewSuccess(news, offset) {
  return {
    type: action.GET_ALL_NEWS_SUCCESS,
    news,
    offset,
  };
}

export function getNewsByUserSuccess(news, offset) {
  return {
    type: action.GET_NEWS_BY_USER_SUCCESS,
    news,
    offset,
  };
}

export function filterNews(searchStr, offset) {
  return {
    type: action.FILTER_NEWS,
    searchStr,
    offset,
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

export function setLastPage(value) {
  return {
    type: action.SET_LAST_PAGE,
    value,
  };
}
