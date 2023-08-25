import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi.js';
import Preloader from '../Preloader/Preloader';
import { searchFilter } from '../../utils/utils';
import { useRenderMovies } from '../../hooks/useRenderMovies';

export default function SavedMovies({ loggedIn, isLoading, setIsLoading }) {

    const {
        setLoadedMovies,
        moviesToRender,
        renderedeMovies,
        renderMore
    } = useRenderMovies();

    const [error, setError] = useState();


    const handleSearch = (search, isShort) => {
        setIsLoading(true);
        setError();
        mainApi
            .getUserMovies()
            .then((loadedMovies) => {
                setLoadedMovies(loadedMovies);
                if (loadedMovies.length === 0) {
                    setError('Вы не добавили еще ни одного фильма в избранное');
                    return;
                }

                const filtered = searchFilter(loadedMovies, search, isShort);
                if (filtered.length === 0) {
                    setError('Ничего не найдено');
                }
                setLoadedMovies(filtered);
            })
            .catch(() => {
                setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            }).finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        mainApi
            .getUserMovies()
            .then((loadedMovies) => {
                setLoadedMovies(loadedMovies);
                setIsLoading(false);
                if (loadedMovies.length === 0) {
                    setError('Вы не добавили еще ни одного фильма в избранное');
                }
            })
            .catch(() => {
                setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            }).finally(() => {
                setIsLoading(false);
            });
    }, []);


    const handleMovieDelete = (movieId, likeHandler) => {
        mainApi
            .deleteMovies(movieId)
            .then(() => {
                likeHandler(false);
                setLoadedMovies((state) => state.filter((m) => m._id !== movieId));
            })
            .catch((e) => console.log(e));
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
                        handleMovieDelete={handleMovieDelete}
                        movies={moviesToRender}
                        renderedeMovies={renderedeMovies}
                        renderMore={renderMore} />}

            </main>
            <Footer />
        </>
    )
}