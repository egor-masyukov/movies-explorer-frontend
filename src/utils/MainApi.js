import { MAIN_URL } from '../utils/constants';


class MainApi {
    constructor(url) {
        this._url = url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject({ errorMessage: `Ошибка: ${res.status}`, errorCode: res.status });
    }

    //регистрация
    registerUser(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        }).then(this._checkResponse);

    }

    //авторизация
    loginUser(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then(this._checkResponse)
            .then((userDatas) => {
                if (userDatas.token) { localStorage.setItem('token', userDatas.token) }
            });
    }

    //получения данных пользователя
    getUserData() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(this._checkResponse)
    }

    //отправка данных пользователя
    editUserData(name, email) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }, method: 'PATCH',
            body: JSON.stringify({ name, email })
        }).then(this._checkResponse)
    }

    //загружаем набор фильмов
    getUserMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(this._checkResponse)
    }

    //добавление фильма
    addUserMovies(movieInfo) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }, body: JSON.stringify({
                ...movieInfo,
            }),
        }).then(this._checkResponse)
    }

    //удаление фильма
    deleteMovies(movieId) {
        return fetch(`${this._url}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(this._checkResponse)
    }

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }
}

const mainApi = new MainApi(MAIN_URL);

export default mainApi