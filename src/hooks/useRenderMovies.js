import { useEffect, useState } from 'react';
import { DISPLAYING_NUMBER_MOVIES } from '../utils/constants';

function useRenderMovies() {
    const [moviesCounter, setMoviesCounter] = useState([]);
    const [moviesToRender, setMoviesToRender] = useState([]);
    const [renderedeMovies, setRenderedMovies] = useState([]);
    const [loadedMovies, setLoadedMovies] = useState([]);

    useEffect(() => {
        let calcMoviesCounter = getMoviesCounter()
        setMoviesCounter(calcMoviesCounter);
        const handlerResize = () => setMoviesCounter(getMoviesCounter());
        window.addEventListener('resize', handlerResize);

        return () => {
            window.removeEventListener('resize', handlerResize);
        };
    }, []);

    useEffect(() => {
        setMoviesToRender([...loadedMovies].slice(0, moviesCounter[0]))
        setRenderedMovies([...loadedMovies].slice(moviesCounter[0]))
    }, [loadedMovies, moviesCounter])

    function getMoviesCounter() {
        let countCards;
        const clientWidth = document.documentElement.clientWidth;

        Object.keys(DISPLAYING_NUMBER_MOVIES)
            .sort((a, b) => a - b)
            .forEach((key) => {
                if (clientWidth > +key) {
                    countCards = DISPLAYING_NUMBER_MOVIES[key];
                }
            });
        return countCards;
    }

    function renderMore() {
        if (renderedeMovies) {
            let newRenderedeMovies = renderedeMovies;
            setMoviesToRender(
                moviesToRender.concat(newRenderedeMovies.splice(0, moviesCounter[1]))
            );
            setRenderedMovies(newRenderedeMovies);
        }
    }

    return {
        moviesToRender,
        renderedeMovies,
        setLoadedMovies,
        renderMore,
    };
}

export { useRenderMovies };