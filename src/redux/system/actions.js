import * as action from './constants';

export function setErrorMessage(value) {
  return {
    type: action.SET_ERROOR_MESSAGE,
    value,
  };
}

export function setLoadingStatus(value) {
  return {
    type: action.SET_LOADING_STATUS,
    value,
  };
}

export function setAdminContentType(value) {
  return {
    type: action.SET_ADMIN_CONTENT_TYPE,
    value,
  };
}
