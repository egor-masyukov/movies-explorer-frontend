import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { regularEmail } from '../../utils/constants';

export default function Register({ handleRegister, statusMessage, setStatusMessage }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [nameError, setNameError] = useState('Необходимо ввести имя')
    const [emailError, setEmailError] = useState('Необходимо ввести email')
    const [passwordError, setPasswordError] = useState('Необходимо ввести пароль')
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        setStatusMessage()
        if (nameError || emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, emailError, passwordError])

    const nameHandler = (e) => {
        setName(e.target.value)
        setStatusMessage()
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
        setEmail(e.target.value)
        setStatusMessage()
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

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        setStatusMessage()
        if (e.target.value.length < 5) {
            setPasswordError('Пароль должен быть длинее 5 символов')
            if (!e.target.value) {
                setPasswordError('Необходимо ввести пароль')
            }
        } else {
            setPasswordError('')
        }
    }

    const blurHandler = (e) => {
        // eslint-disable-next-line default-case
        switch (e.target.name) {
            case 'name': setNameDirty(true)
                break
            case 'email': setEmailDirty(true)
                break
            case 'password': setPasswordDirty(true)
                break
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        handleRegister(name, email, password);
    };

    return (
        <section className='login'>
            <form className='loginForm' onSubmit={handleSubmit}>
                <Link to='/' className='loginForm__logo-link'><img className='loginForm__logo' src={logo} alt='логотип'></img></Link>
                <h1 className='loginForm__title'>Добро пожаловать!</h1>
                <label className='loginForm__input-label'>Имя</label>
                <input className='loginForm__input' onChange={e => nameHandler(e)} value={name} onBlur={e => blurHandler(e)} name='name' type='text' placeholder='Введите имя' minLength='2'
                    maxLength='30' required></input>
                <span className='loginForm__input-span'>{(nameDirty && nameError) && <div>{nameError}</div>}</span>

                <label className='loginForm__input-label'>E-mail</label>
                <input className='loginForm__input' onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type='email' placeholder='Введите E-Mail' required></input>
                <span className='loginForm__input-span'>{(emailDirty && emailError) && <div>{emailError}</div>}</span>

                <label className='loginForm__input-label'>Пароль</label>
                <input className='loginForm__input' onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='Введите пароль' minLength='5' required></input>
                <span className='loginForm__input-span'>{(passwordDirty && passwordError) && <div>{passwordError}</div>}</span>

                <span className='loginForm__button-span'>{statusMessage}</span>
                <button className={`loginForm__button-edit ${formValid ? 'loginForm__button-edit_active' : ''}`} type='submit' disabled={!formValid}>Зарегистрироваться</button>
                <p className='loginForm__button-question' type='button'>Уже зарегистрированы?<Link to='/signin' className='loginForm__button-in'>Войти</Link></p>
            </form>
        </section>
    )
}