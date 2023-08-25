import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { regularEmail } from '../../utils/constants';

export default function Login({ handleLogin, statusMessage }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Необходимо ввести email')
    const [passwordError, setPasswordError] = useState('Необходимо ввести пароль')
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
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
            case 'email': setEmailDirty(true)
                break
            case 'password': setPasswordDirty(true)
                break
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        handleLogin(email, password);
    };

    return (
        <section className='login'>
            <form className='loginForm' onSubmit={handleSubmit}>
                <Link to='/' className='loginForm__logo-link'><img className='loginForm__logo' src={logo} alt='логотип'></img></Link>
                <h1 className='loginForm__title'>Рады видеть!</h1>

                <label className='loginForm__input-label'>E-mail</label>
                <input className='loginForm__input' onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type='email' placeholder='Введите E-Mail' required></input>
                <span className='loginForm__input-span'>{(emailDirty && emailError) && <div>{emailError}</div>}</span>

                <label className='loginForm__input-label'>Пароль</label>
                <input className='loginForm__input' onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='Введите пароль' minLength='5' required></input>
                <span className='loginForm__input-span'>{(passwordDirty && passwordError) && <div>{passwordError}</div>}</span>

                <span className='loginForm__button-span'>{statusMessage}</span>
                <button className={`loginForm__button-edit ${formValid ? 'loginForm__button-edit_active' : ''}`} type='submit' disabled={!formValid}>Войти</button>
                <p className='loginForm__button-question' type='button'>Ещё не зарегистрированы?<Link to='/signup' className='loginForm__button-in'>Регистрация</Link></p>
            </form>
        </section>
    )
}