
import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

export default function MoviesCardList({ movies, onSaveHandler, handleMovieDelete, savedMovies, renderedeMovies, renderMore }) {

    return (
        <>
            <ul className='moviesCardList'>

                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id || movie.movieId}
                        savedMovies={savedMovies || movies}
                        onSaveHandler={onSaveHandler}
                        handleMovieDelete={handleMovieDelete}
                        movie={movie} />
                ))}

            </ul>
            {renderedeMovies.length > 0 ? <button className='moviesMore' type='button' name='more' onClick={renderMore}>Ещё</button> : <></>
            }
        </>
    )
}