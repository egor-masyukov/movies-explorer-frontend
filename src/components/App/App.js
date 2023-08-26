import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import MainApi from '../../utils/MainApi';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [statusMessage, setStatusMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setStatusMessage()

        if (token) {
            Promise.all([MainApi.getUserData()])
                .then(([userInfo]) => {
                    setCurrentUser(userInfo);
                })
                .catch(err => console.log(err))
        }
    }, [loggedIn]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setStatusMessage()
        if (token) {
            MainApi.checkToken(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                    }
                }).catch((err) => {
                    console.log(err)
                    handleLogOut();
                }).finally(() => {
                    setIsAppLoaded(true);
                });
        } else {
            setIsAppLoaded(true);
        }
    }, []);

    const getUserInfo = () => {
        MainApi.getUserData()
            .then(data => {
                setCurrentUser(data);
                setLoggedIn(true);
            })
            .catch(err => console.log(err))
    }

    const handleRegister = (name, email, password) => {
        MainApi.registerUser(name, email, password)
            .then(() => {
                navigate('/signin');
            })
            .catch(({ errorCode, errorMessage }) => {
                if (errorCode === 409) {
                    setStatusMessage('Такой Email уже существует')
                } else { setStatusMessage(errorMessage) }
            })
    };

    const handleLogin = (email, password) => {
        MainApi.loginUser(email, password)
            .then(() => {
                const token = localStorage.getItem('token');
                if (token) {
                    setLoggedIn(true);
                    getUserInfo();
                    navigate('/movies');
                }
            })
            .catch(({ errorCode, errorMessage }) => {
                if (errorCode === 401) {
                    setStatusMessage('Неверные данные для входа')
                } else { setStatusMessage(errorMessage) }
            })
    };

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.clear();
        setLoggedIn(false);
        setCurrentUser({});
        navigate('/');
    };

    return (
        <>
            <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
                { isAppLoaded &&
                <Routes>
                    <Route exact path='/'
                        element={<Main
                            loggedIn={loggedIn} />} />

                    <Route path='/movies'
                        element={<ProtectedRoute
                            component={Movies}
                            loggedIn={loggedIn}
                            setIsLoading={setIsLoading}
                            isLoading={isLoading}
                            statusMessage={statusMessage}
                            setStatusMessage={setStatusMessage}
                        />} />

                    <Route path='/saved-movies'
                        element={<ProtectedRoute
                            component={SavedMovies}
                            loggedIn={loggedIn}
                            setIsLoading={setIsLoading}
                            isLoading={isLoading}
                            statusMessage={statusMessage}
                            setStatusMessage={setStatusMessage}
                        />} />

                    <Route path='/profile'
                        element={<ProtectedRoute
                            component={Profile}
                            loggedIn={loggedIn}
                            handleLogOut={handleLogOut}
                            statusMessage={statusMessage}
                            setStatusMessage={setStatusMessage} />} />

                    <Route path='/signin'
                        element={loggedIn ? <Navigate to="/movies" /> : <Login
                            handleLogin={handleLogin}
                            setStatusMessage={setStatusMessage}
                            statusMessage={statusMessage} />} />

                    <Route path='/signup'
                        element={loggedIn ? <Navigate to="/movies" /> : <Register
                            handleRegister={handleRegister}
                            setStatusMessage={setStatusMessage}
                            statusMessage={statusMessage} />} />

                    <Route path='*'
                        element={<PageNotFound />} />

                </Routes>
                }
            </CurrentUserContext.Provider>
        </>
    );
}