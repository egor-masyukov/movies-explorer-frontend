import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';


export default function Profile() {

    return (
        <>
            <Header />
        <section className='profile'>
            <form className='profileForm'>
            <h1 className='profileForm__title'>Привет, Виталий!</h1>
            <input className='profileForm__input' placeholder='Имя'></input>
            <p className='profileForm__input-line'></p>
            <input className='profileForm__input' placeholder='E-mail'></input>
            <button className='profileForm__button-edit'>Редактировать</button>
            <Link to='/signin' className='profileForm__button-exit'>Выйти из аккаунта</Link>
            </form>
        </section>
        </>
    )
}