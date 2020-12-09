export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _error(res) {
      if (res.ok) {
        return res.json();
      } else  return Promise.reject(`Ошибка: ${res.status}`);

  }

  getCard() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._error)
  }

  newCard(info) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(
        info
      )
    }).then(this._error)
  }

  deleteCard(info) {
    return fetch(`${this._url}/cards/${info._id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._error)
  }

  getInfoAndAvatar() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._error)
  }

  updateInfo(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(
        info
      )
    }).then(this._error)
  }

  updateAvatar(info) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(
        info
      )
    }).then(this._error)
  }


  deleteLike(info) {
    return fetch(`${this._url}/cards/likes/${info._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._error)
  }

  countLikeApi(info) {
    return fetch(`${this._url}/cards/likes/${info._id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._error)
  }



}