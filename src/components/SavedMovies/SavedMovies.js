import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function SavedMovies(props) {

    return (
        <>
            <Header />
            <main className='movies'>
                <SearchForm />
                <MoviesCardList className='moviesCard__like-button_delete'/>
            </main>
            <Footer />
        </>

    )
}