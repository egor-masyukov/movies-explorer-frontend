import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import React from 'react';
import { Link } from 'react-router-dom';


export default function Header({ loggedIn }) {
    return (
        <header className='header'>
            <Link to='/' className='header__logo-link'><img className='header__logo' src={logo} alt='логотип' /></Link>
            <Navigation loggedIn={loggedIn} />
        </header >
    )
}