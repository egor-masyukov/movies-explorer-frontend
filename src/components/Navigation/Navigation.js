import React from 'react';
import { Link, useLocation } from 'react-router-dom';


export default function Navigation() {
    const location = useLocation().pathname;

    return (
        <>
            {location === '/' ? (
                <nav className='navigationAuth'>
                    <Link to='/signup' className='navigationAuth__reg'>Регистрация</Link>
                    <Link to='/signin' className='navigationAuth__button-in'>
                        <p className='navigationAuth__in'>Войти</p>
                    </Link>
                </nav>

            ) : (
                <nav className='navigationMenu'>
                    <input className='navigationMenu__toggle' id='navigationMenu__toggle' type='checkbox' />
                    <label className='navigationMenu__btn' htmlFor='navigationMenu__toggle'>
                        <span></span>
                    </label>
                    <div className='navigationMenu__overlay' hidden></div>

                    <div className='navigation'>
                        <div className='navigation__items'>
                            <div className='navigation__movies-switch'>
                                <p><Link to='/' className='navigation__movies' hidden >Главная</Link></p>
                                <p><Link to='/movies' className={location === '/movies' ? 'navigation__movies navigation__movies_active' : 'navigation__movies'} >Фильмы</Link></p>
                                <p><Link to='/saved-movies' className={location === '/saved-movies' ? 'navigation__movies navigation__movies_active' : 'navigation__movies'} >Сохранённые фильмы</Link></p>
                            </div>
                            <>
                                <Link to='/profile' className='navigation__button-account'>
                                    <p className='navigation__account'>Аккаунт</p>
                                    <p className='navigation__account-ico'></p>
                                </Link>
                            </>

                        </div>
                    </div>

                </nav>

            )}
        </>
    )
};