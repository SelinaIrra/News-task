export function getUser(login, password) {
  return ['get', `/users?q=login:${login},password:${password}`];
}

export function getAllNews() {
  return ['get', '/news?q=status:approved'];
}

export function getUserNews(id) {
  return ['get', `/news?q=status:pending,author:${id}`];
}
