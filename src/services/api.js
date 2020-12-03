import { STATUS, LIMIT } from '../constants';

function prepareNewsParams(offset) {
  return [
    `limit=${LIMIT}`,
    `skip=${offset}`,
    'sort=-date',
  ];
}

export function getUser(login, password) {
  return ['get', `/users?${[
    `q=login:${login},password:${password}`,
  ].join('&')}`];
}

export function getAllApprovedNews(filter = '', offset = 0) {
  return ['get', `/news?${[
    ...prepareNewsParams(offset),
    `q=status:approved${filter ? `,name:*${filter}*` : ''}`,
  ].join('&')}`];
}

export function getUserNews(id, filter = '', offset = 0) {
  return ['get', `/news?${[
    ...prepareNewsParams(offset),
    `q=status:pending,author:${id}${filter ? `,name:*${filter}*` : ''}`,
  ].join('&')}`];
}

export function getAllNews(filter = '', offset = 0) {
  return ['get', `/news?${[
    ...prepareNewsParams(offset),
    filter ? `&q=name:*${filter}*` : '',
  ].join('&')}`];
}

export function createNews(title, text, user) {
  return ['post', '/news', {
    name: `${title}`,
    author: `${user}`,
    status: STATUS.PENDING,
    date: (new Date()).formatedDateTime(),
    text,
  }];
}

export function deleteNews(id) {
  return ['delete', `/news/${id}`];
}

export function updateNews(data) {
  return ['put', `/news/${data._id}`, {
    name: `${data.name}`,
    author: `${data.author}`,
    status: STATUS.APPROVED,
    date: (new Date()).formatedDateTime(),
    text: `${data.text}`,
  }];
}
