export default function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__paragraph'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__info'>
                <p className='footer__copyright'>&copy; 2023 Масюков Егор</p>
                <div className='footer__link'>
                    <a className='footer__text' href='https://practicum.yandex.ru/' rel="noreferrer" target='_blank'>Яндекс.Практикум</a>
                    <a className='footer__text'  href='https://github.com/egor-masyukov' rel="noreferrer" target='_blank'>GitHub</a>
                </div>
            </div>

        </footer>
    )
}