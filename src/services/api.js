export function getUser(login, password) {
  return ['get', `/users?q=login:${login},password:${password}`];
}

export function getAllNews(filter) {
  return ['get', `/news?q=status:approved${filter ? `,name:*${filter}*` : ''}`];
}

export function getUserNews(id, filter) {
  return ['get', `/news?q=status:pending,author:${id}${filter ? `,name:*${filter}*` : ''}`];
}
