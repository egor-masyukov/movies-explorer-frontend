import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Register() {


    return (
        <section className='login'>
            <form className='loginForm'>
                <Link to='/' className='loginForm__logo-link'><img className='loginForm__logo' src={logo} alt='логотип'></img></Link>
                <h1 className='loginForm__title'>Добро пожаловать!</h1>
                <label className='loginForm__input-label'>Имя</label>
                <input className='loginForm__input' minlength='2' maxlength='30' type='text' placeholder='Введите Имя' required></input>
                <span className='loginForm__input-span'></span>
                <label className='loginForm__input-label'>E-mail</label>
                <input className='loginForm__input' type='email' placeholder='Введите E-Mail' required></input>
                <span className='loginForm__input-span' disable></span>
                <label className='loginForm__input-label'>Пароль</label>
                <input className='loginForm__input loginForm__input_error' type='password' minlength='3' placeholder='Введите пароль' required></input>
                <span className='loginForm__input-span'>Что-то пошло не так...</span>
                <Link to='/signin' className='loginForm__button-edit' type='submit'>Зарегистрироваться</Link>
                <p className='loginForm__button-question' type='button'>Уже зарегистрированы?<Link to='/signin' className='loginForm__button-in'>Войти</Link></p>
            </form>
        </section>
    )
}