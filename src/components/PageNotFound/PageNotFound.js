import React from "react";
import { useNavigate  } from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();
  
    return (
        <section className='pageNotFound'>
            <h1 className='pageNotFound__error'>404</h1>
            <p className='pageNotFound__title'>Страница не найдена</p>
            <button className='pageNotFound__link' onClick={() => navigate(-1)}>Назад</button>
        </section>
    )
}