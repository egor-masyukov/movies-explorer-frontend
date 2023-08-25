import React from 'react';
import earth from '../../images/earth.svg';
import photo from '../../images/photo.jpg';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


export default function Main({ loggedIn }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main className='main'>
                <section className='lead'>
                    <div className='lead__text-blok'>
                        <h1 className='lead__title'>Учебный проект студента факультета Веб‑разработки.</h1>
                        <p className='lead__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                        <a className='lead__link' href='#description'>Узнать больше</a>
                    </div>
                    <img className='lead__image' src={earth} alt='глобус' />
                </section>
                <section id='description' className='description'>
                    <h2 className='title'>О проекте</h2>
                    <div className='description__subtitle'>
                        <div>
                            <p className='description__subtitle-name'>Дипломный проект включал 5 этапов</p>
                            <p className='description__subtitle-paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                        </div>
                        <div>
                            <p className='description__subtitle-name'>На выполнение диплома ушло 5 недель</p>
                            <p className='description__subtitle-paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                        </div>
                    </div>
                    <div className='description__timeline'>
                        <div>
                            <p className='description__timeline-one-week'>1&nbsp;неделя</p>
                            <p className='description__timeline-name'>Back-end</p>
                        </div>
                        <div>
                            <p className='description__timeline-four-week'>4&nbsp;недели</p>
                            <p className='description__timeline-name'>Front-end</p>
                        </div>
                    </div>

                </section>
                <section className='techs'>
                    <h2 className='title'>Технологии</h2>
                    <h3 className='techs__title'>7 технологий</h3>
                    <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                    <ul className='techs__items'>
                        <li className='techs__item'>HTML</li>
                        <li className='techs__item'>CSS</li>
                        <li className='techs__item'>JS</li>
                        <li className='techs__item'>React</li>
                        <li className='techs__item'>Git</li>
                        <li className='techs__item'>Express.js</li>
                        <li className='techs__item'>mongoDB</li>
                    </ul>
                </section>
                <section className='about'>
                    <h2 className='title'>Студент</h2>
                    <div className='aboutMe'>
                        <div className='aboutMe__text'>
                            <h3 className='aboutMe__title'>Егор</h3>
                            <p className='aboutMe__subtitle'>Фронтенд-разработчик, 29 лет</p>
                            <p className='aboutMe__paragraph'>Я родился и живу в Санкт-Петербурге, закончил факультет экономики. Я увлекаюсь музыкой, управляю бизнесом по продаже музыкального оборудования.
                                Увлекался программированием и веб-разработкой со школьных, студенческих времен. Увлечение переросло в желание расти в профессиональном плане. Так я пришел в Яндекс.Практикум на веб-разработку.</p>
                            <a className='aboutMe__link' href='https://github.com/egor-masyukov' rel='noreferrer' target='_blank'>GitHub</a>
                        </div>
                        <img className='aboutMe__photo' src={photo} alt='фото' />
                    </div>
                    <p className='about__portfolio'>Портфолио</p>
                    <div className='portfolio'>
                        <a className='portfolio__item' href='https://egor-masyukov.github.io/how-to-learn/' rel='noreferrer' target='_blank'><p className='portfolio__item-text'>Статичный сайт</p><p className='portfolio__item-link'>↗</p></a>
                        <p className='portfolio__item-line'></p>
                        <a className='portfolio__item' href='https://egor-masyukov.github.io/russian-travel/' rel='noreferrer' target='_blank'><p className='portfolio__item-text'>Адаптивный сайт</p><p className='portfolio__item-link'>↗</p></a>
                        <p className='portfolio__item-line'></p>
                        <a className='portfolio__item' href='https://egor-masyukov.github.io/mesto-react/' rel='noreferrer' target='_blank'><p className='portfolio__item-text'>Одностраничное приложение</p><p className='portfolio__item-link'>↗</p></a>
                    </div>
                </section>
            </main >
            <Footer />
        </>
    )
}