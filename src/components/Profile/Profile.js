import MainApi from '../../utils/MainApi';
import React from 'react';
import Header from '../Header/Header';
import { useEffect, useState, useContext } from 'react';
import { regularEmail } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function Profile({ loggedIn, handleLogOut, statusMessage, setStatusMessage }) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name)
    const [email, setEmail] = useState(currentUser.email)
    const [nameDirty, setNameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [nameError, setNameError] = useState()
    const [emailError, setEmailError] = useState()
    const [formValid, setFormValid] = useState(true)

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdateUser({ name: name, email: email });
    }

    const handleUpdateUser = (userData) => {
        setStatusMessage()
        MainApi.editUserData(userData.name, userData.email)
            .then((res) => setCurrentUser(res), setStatusMessage('Данные успешно сохранены'))
            .catch(({ errorCode, errorMessage }) => {
                if (errorCode === 409) {
                    setStatusMessage('Такой Email уже существует')

                } else { setStatusMessage(errorMessage) }
            })
    }

    useEffect(() => {
        setStatusMessage()

        if (nameError || emailError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, emailError])

    const nameHandler = (e) => {
        setStatusMessage()
        setName(e.target.value)
        blurHandler(e)
        if (e.target.value.length < 2 || e.target.value.length > 30) {
            setNameError('Имя должно быть от 2 до 30 символов')
            if (!e.target.value) {
                setNameError('Необходимо ввести имя')
            }
        } else {
            setNameError('')
        }
    }

    const emailHandler = (e) => {
        setStatusMessage()
        setEmail(e.target.value)
        blurHandler(e)
        const re = regularEmail;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Введен некорректный email')
            if (!e.target.value) {
                setEmailError('Необходимо ввести email')
            }
        } else {
            setEmailError('')
        }
    }

    const blurHandler = (e) => {
        // eslint-disable-next-line default-case
        switch (e.target.name) {
            case 'name': setNameDirty(true)
                break
            case 'email': setEmailDirty(true)
                break
        }
    }

    return (
        <>
            <Header loggedIn={loggedIn} />
            <section className='profile'>
                <form className='profileForm' onSubmit={handleSubmit}>
                    <h1 className='profileForm__title'>Привет, {name}!</h1>
                    <input className='profileForm__input' placeholder='Имя' onChange={e => nameHandler(e)} value={name} name='name' type='text' minLength='2'
                        maxLength='30' required></input>
                    <span className='profileForm__input-span'>{(nameDirty && nameError) && <div>{nameError}</div>}</span>

                    <p className='profileForm__input-line'></p>
                    <input className='profileForm__input' onChange={e => emailHandler(e)} value={email} name='email' type='email' placeholder='E-mail' required></input>
                    <span className='profileForm__input-span'>{(emailDirty && emailError) && <div>{emailError}</div>}</span>

                    <span className='profileForm__button-span'>{statusMessage}</span>

                    <button className={`profileForm__button-edit ${(formValid && (nameDirty || emailDirty)) && (name !== currentUser.name || email !== currentUser.email) ? 'profileForm__button-edit_active' : ''}`}
                        type='submit' disabled={!((formValid && (nameDirty || emailDirty)) && (name !== currentUser.name || email !== currentUser.email))}>Редактировать</button>
                    <button onClick={handleLogOut} type='button' className='profileForm__button-exit'>Выйти из аккаунта</button>
                </form>
            </section>
        </>
    )
}