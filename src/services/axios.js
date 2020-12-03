import axios from 'axios';
import { SOURCE_URL } from '../constants';

const CancelAxiosToken = axios.CancelToken;
const source = CancelAxiosToken.source();

function Ajax(
  httpMethod, url, payload, headers,
) {
  const headersObj = {
    'content-type': 'application/json',
    ...headers,
  };

  const service = axios.create({
    headers: headersObj,
    baseURL: SOURCE_URL,
  });

  const handleSuccess = (response) => response;

  const handleError = (error) => error;

  service.interceptors.response.use(handleSuccess, handleError);

  switch (httpMethod) {
    case 'get':
      return service.get(url, {
        params: payload,
        cancelToken: source.token,
      });
    case 'delete':
      return service.delete(url, {
        params: payload,
        cancelToken: source.token,
      });
    case 'post':
      return service.post(url, payload, {
        cancelToken: source.token,
      });
    case 'put':
      return service.put(url, payload, {
        cancelToken: source.token,
      });
    case 'patch':
      return service.patch(url, payload, {
        cancelToken: source.token,
      });
    default:
      break;
  }
}

export default Ajax;
