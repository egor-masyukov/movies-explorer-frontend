import iconSearch from '../../images/iconSearch.svg';
import find from '../../images/find.svg';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchForm({ handleSearch, setError }) {
    const inputRef = useRef();
    const [shorts, setShorts] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const location = useLocation().pathname;

    useEffect(() => {
        if (location === '/movies') {
            const search = localStorage.getItem('search');
            if (search) {
                setInputValue(search);
            }

            const shortsFromStorage = localStorage.getItem('shorts');
            setShorts(shortsFromStorage === 'true');
        }
    }, []);

    const handeleInput = (evt) => {
        setInputValue(evt.target.value);
    };

    const handelCheckbox = () => {
        setShorts(!shorts);
        const isValid = validateInput();
        if (!isValid) {
            return;
        }
        handleSearch(inputValue, !shorts);
        if (location === '/movies') {
            localStorage.setItem('shorts', !shorts);
        }
    };

    function validateInput() {
        const isValid = inputValue !== '';
        if (!isValid) {
            setError('Нужно ввести ключевое слово');
            inputRef.current.focus();
        }
        return isValid;
    }

    const handleSubmit = (evt) => {
        setError();
        evt.preventDefault();
        const isValid = validateInput()
        if (!isValid) {
            return;
        }
        if (location === '/movies') {
            localStorage.setItem('search', inputValue);
        }
        handleSearch(inputValue, shorts);
    };

    return (
        <form className='searchForm' onSubmit={handleSubmit}>
            <div className='searchForm__container'>
                <img src={iconSearch} alt='стрелка поиска' className='searchForm__iconSearch' ></img>
                <input ref={inputRef} className='searchForm__input' placeholder='Фильм' type='text'
                    onChange={handeleInput} value={inputValue} id='search' name='search'
                />
                <button className='searchForm__button' type='submit' ><img className='searchForm__button-ico' src={find} alt='стрелка поиска' ></img></button>
            </div>
            <div className='filterCheckbox'>
                <label className={`filterCheckbox__switch ${shorts ? 'filterCheckbox__switch__active' : ''}`}>
                    <input className='filterCheckbox__input' type='checkbox' name='checkbox' value={shorts} onChange={handelCheckbox} />
                    <span className='filterCheckbox__slider'></span>
                </label>
                <p className='filterCheckbox__name'>Короткометражки</p>
            </div>
        </form >
    )
}