const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
  headers: {
    authorization: '40811a44-55df-441d-9790-3adade90da82',
    'Content-Type': 'application/json'
  }
}


const sendApiRequest = (path, method = 'GET', data = null) => {
  const fetchConfig = {
    method: method,
    headers: config.headers
  };
  if (data) {
    fetchConfig.body = JSON.stringify(data)
  }

  return fetch(config.baseUrl + path, fetchConfig)
    .then(checkStatusRequest)
};


const checkStatusRequest = (res) => {
  if (res.ok) {
    return res.json();
  } 
  return Promise.reject(`Ошибка: ${res.status}`);
};


const checkMIMEType = (url) => {
  return fetch(url, {method: 'HEAD'})
    .then((res) => {
      return res.headers.get('Content-Type').includes('image') && res.ok
    })
};


export const getUserData = () => {
  return sendApiRequest('/users/me')
};

export const getCardList = () => {
  return sendApiRequest('/cards')
};

export const changeProfileInfo = (name, about) => {
  return sendApiRequest('/users/me', 'PATCH', {name, about});
};

export const addNewCard = (name, link) => {
  return sendApiRequest('/cards', 'POST', {name, link});
};

export const deleteCard = (cardId) => {
  return sendApiRequest(`/cards/${cardId}`, 'DELETE');
};

export const setLikeCard = (cardId) => {
  return sendApiRequest(`/cards/likes/${cardId}`, 'PUT');
};

export const unsetLikeCard = (cardId) => {
  return sendApiRequest(`/cards/likes/${cardId}`, 'DELETE');
};

export const changeAvatar = (urlAvatar) => {
  const body = {
    avatar: urlAvatar
  };
  return checkMIMEType(urlAvatar)
    .then((isImage) => {
      if (isImage) {
        return sendApiRequest(`/users/me/avatar`, 'PATCH', body);
      }
      return Promise.reject(`Ошибка: по ссылке нет картинки!`);
    })
};

