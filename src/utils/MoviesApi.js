import { MOVIE_URL } from '../utils/constants';

class MoviesApi {
  constructor(url) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //загружаем набор фильмов
  getInitialMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse)
  }
}

const moviesApi = new MoviesApi(MOVIE_URL);

export default moviesApi