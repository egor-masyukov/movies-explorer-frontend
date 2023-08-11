import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Login() {

    return (
        <section className='login'>
            <form className='loginForm' >
            <Link to='/' className='loginForm__logo-link'><img className='loginForm__logo' src={logo} alt='логотип'></img></Link>
                <h1 className='loginForm__title'>Рады видеть!</h1>
                <label className='loginForm__input-label'>E-mail</label>
                <input className='loginForm__input' type='email' placeholder='Введите E-Mail' required></input>
                <span className='loginForm__input-span' ></span>
                <label className='loginForm__input-label'>Пароль</label>
                <input className='loginForm__input' minlength='3' type='password' placeholder='Введите пароль' required></input>
                <span className='loginForm__input-span'></span>
                <Link to='/movies' className='loginForm__button-edit' type='submit'>Войти</Link>
                <p className='loginForm__button-question' type='button'>Ещё не зарегистрированы? <Link to='/signup' className='loginForm__button-in'>Регистрация</Link></p>
            </form>
        </section>
    )
}