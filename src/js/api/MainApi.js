export default class MainApi {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  signup = (email, password, name) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => {
        throw err;
      })
  }

  signin = (email, password) => {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise))
      })
      .catch((err) => {
        throw err;
      })
  }

  getUserData = () => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        throw err;
      })
  }

  logout = () => {
    return fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      })
  }

  getArticles = () => {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      })
  }

  createArticle = obj => {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        keyword: obj.keyword,
        title: obj.title,
        text: obj.text,
        date: obj.date,
        source: obj.source,
        link: obj.link,
        image: obj.image,
      }),
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      })
  }

  removeArticle = articleId => {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      })
  }

  _getResponseData = res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

