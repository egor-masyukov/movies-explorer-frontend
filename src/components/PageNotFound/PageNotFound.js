export default function PageNotFound() {

    return (
        <section className='pageNotFound'>
            <h1 className='pageNotFound__error'>404</h1>
            <p className='pageNotFound__title'>Страница не найдена</p>
            <a className='pageNotFound__link' href='/' >Назад</a>
        </section>
    )
}