import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi.js';
import MoviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import { searchFilter } from '../../utils/utils';
import { useRenderMovies } from '../../hooks/useRenderMovies';

export default function Movies({ loggedIn, isLoading, setIsLoading }) {

    const {
        setLoadedMovies,
        moviesToRender,
        renderedeMovies,
        renderMore
    } = useRenderMovies();

    const [savedMovies, setSavedMovies] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        setIsLoading(true);
        mainApi
            .getUserMovies()
            .then((data) => {
                if (data.length > 0) {
                    setSavedMovies(data)
                }
            })
            .catch(() => {
                setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            }).finally(() => {
                setIsLoading(false);
            });
        const searchResult = JSON.parse(localStorage.getItem('movies') || '[]');
        if (searchResult) {
            setLoadedMovies(searchResult)
        }
    }, []);

    const handleSearch = (search, shorts) => {
        setLoadedMovies([])
        setIsLoading(true);
        MoviesApi
            .getInitialMovies(search, shorts)
            .then((loadedMovies) => {
                const filtered = searchFilter(loadedMovies, search, shorts);
                localStorage.setItem('movies', JSON.stringify(filtered));
                if (filtered.length === 0) {
                    setError('Ничего не найдено');
                } else {
                    setLoadedMovies(filtered);
                }
            })
            .catch(() => {
                setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const handlingIdentifier = (id, array) => {
        const searchItem = array.find((movie) => movie.movieId === id);
        return searchItem._id;
    };

    const saveMovie = (movie, likeHandler) => {
        mainApi.addUserMovies(movie)
            .then((newMovie) => {
                setSavedMovies([...savedMovies, newMovie]);
                likeHandler(true);
            })
            .catch((err) => console.log(err));
    };

    const handleMovieDelete = (movieId, likeHandler) => {
        const idInSavedMovies = handlingIdentifier(movieId, savedMovies);
        mainApi
            .deleteMovies(idInSavedMovies)
            .then(() => {
                likeHandler(false);
                setSavedMovies((state) =>
                    state.filter((m) => m._id !== idInSavedMovies)
                );
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className='movies'>

                <SearchForm
                    handleSearch={handleSearch}
                    setError={setError} />

                <span className='movies__span'>{error}</span>

                {isLoading ? <Preloader /> :
                    <MoviesCardList
                        renderedeMovies={renderedeMovies}
                        movies={moviesToRender}
                        savedMovies={savedMovies}
                        onSaveHandler={saveMovie}
                        handleMovieDelete={handleMovieDelete}
                        renderMore={renderMore} />}

            </main>
            <Footer />
        </>
    )
}