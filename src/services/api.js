export function getUser(login, password) {
  return ['get', `/users?q=login:${login},password:${password}`];
}

export function getAllApprovedNews(filter) {
  return ['get', `/news?q=status:approved${filter ? `,name:*${filter}*` : ''}`];
}

export function getUserNews(id, filter) {
  return ['get', `/news?q=status:pending,author:${id}${filter ? `,name:*${filter}*` : ''}`];
}

export function getAllNews(filter) {
  return ['get', `/news${filter ? `?q=name:*${filter}*` : ''}`];
}

export function createNews(title, text, user) {
  return ['post', '/news', {
    name: `${title}`,
    author: `${user}`,
    status: 'pending',
    date: (new Date()).toLocaleDateString().split('.').reverse()
      .join('.'),
    text,
  }];
}
