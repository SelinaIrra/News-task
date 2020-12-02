export function getUser(login, password) {
  return ['get', `/users?q=login:${login},password:${password}`];
}

export function getAllNews() {
  return ['get', '/users?q=status:=approved'];
}

export function getUserNews(id) {
  return ['get', `/users?q=status:=panding,author:=${id}`];
}
