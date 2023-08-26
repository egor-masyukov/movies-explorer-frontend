import CurrentUserContext from '../../contexts/CurrentUserContext';
import React, { useContext, useState, useEffect } from 'react';
import { minuteConversion } from '../../utils/utils';
import { useLocation } from 'react-router-dom';

export default function MovieCard({ movie, savedMovies, onSaveHandler, handleMovieDelete }) {
    const location = useLocation().pathname;
    const currentUser = useContext(CurrentUserContext);
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        if (savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)) {
            setIsSaved(true);
        }
    }, [savedMovies, movie.id]);
    const handleSaveMovie = () => {
        const movieData = {
            country: movie.country || 'отсутствует',
            director: movie.director || 'отсутствует',
            duration: movie.duration || 0,
            year: movie.year || 'отсутствует',
            description: movie.description || 'отсутствует',
            image: `https://api.nomoreparties.co${movie.image.url}`,
            trailerLink: movie.trailerLink,
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
            owner: currentUser.currentUser._id,
            movieId: movie.id,
            nameRU: movie.nameRU || 'отсутствует',
            nameEN: movie.nameEN || 'отсутствует'
        };
        onSaveHandler(movieData, setIsSaved);
    };

    const handleDeleteMovie = () => {
        if (location === '/saved-movies') {
        }
        handleMovieDelete(movie._id || movie.id, setIsSaved);
    };

    return (
        <li className='moviesCard'>
            <div className='moviesCard__title-zone'>
                <div>
                    <h2 className='moviesCard__title'>{movie.nameRU}</h2>
                    <p className='moviesCard__time'>{minuteConversion(movie.duration)}</p>
                </div>

                <div className='moviesCard__like'>

                    {location === '/movies'
                        ? (<button type='button' className={`moviesCard__like-button ${!isSaved
                            ? ''
                            : 'moviesCard__like-button_active'
                            }`} onClick={isSaved
                                ? handleDeleteMovie
                                : handleSaveMovie} />)
                        : (<button type='button' className='moviesCard__like-button moviesCard__like-button_delete' onClick={handleDeleteMovie} />)
                    }
                </div>
            </div>
            <a href={movie.trailerLink} rel='noreferrer' target='_blank'>
                <img className='moviesCard__image' src={location === '/movies' ? `https://api.nomoreparties.co/${movie.image.url}` : `${movie.image}`} alt={movie.nameRU} />
            </a>
        </li>
    )
}