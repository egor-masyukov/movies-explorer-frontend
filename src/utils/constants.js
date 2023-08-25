const {REACT_APP_NODE_ENV, REACT_APP_MAIN_URL_ENV, REACT_APP_MOVIE_URL_ENV } = process.env;

// eslint-disable-next-line no-useless-escape
export const regularEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const MAIN_URL = REACT_APP_NODE_ENV === 'production' ? REACT_APP_MAIN_URL_ENV : 'https://api.egor.nomoredomains.xyz'

export const MOVIE_URL = REACT_APP_NODE_ENV === 'production' ? REACT_APP_MOVIE_URL_ENV : 'https://api.nomoreparties.co'

export const DISPLAYING_NUMBER_MOVIES = { 1280: [12, 3], 768: [8, 2], 0: [5, 2] }
