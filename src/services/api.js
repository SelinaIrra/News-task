export function getUser(login, password) {
  return ['get', `/users?q=login:${login},password:${password}`];
}

export function getAllApprovedNews(offset, filter) {
  return ['get', `/news?limit=30&skip=${offset}&sort=-date&q=status:approved${filter ? `,name:*${filter}*` : ''}`];
}

export function getUserNews(offset, id, filter) {
  return ['get', `/news?limit=30&skip=${offset}&sort=-date&q=status:pending,author:${id}${filter ? `,name:*${filter}*` : ''}`];
}

export function getAllNews(offset, filter) {
  return ['get', `/news?limit=30&skip=${offset}&sort=-date${filter ? `&q=name:*${filter}*` : ''}`];
}

export function createNews(title, text, user) {
  return ['post', '/news', {
    name: `${title}`,
    author: `${user}`,
    status: 'pending',
    date: (new Date()).formatedDateTime(),
    text,
  }];
}

export function deleteNews(id) {
  return ['delete', `/news/${id}`];
}

export function updateNews(data) {
  // eslint-disable-next-line no-underscore-dangle
  return ['put', `/news/${data._id}`, {
    name: `${data.name}`,
    author: `${data.author}`,
    status: 'approved',
    date: (new Date()).formatedDateTime(),
    text: `${data.text}`,
  }];
}
