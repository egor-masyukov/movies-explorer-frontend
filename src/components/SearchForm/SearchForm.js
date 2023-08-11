import iconSearch from '../../images/iconSearch.svg';
import find from '../../images/find.svg';



export default function SearchForm() {

    return (
        <form className='searchForm'>
            <div className='searchForm__container'>
                <img src={iconSearch} alt='стрелка поиска' className='searchForm__iconSearch' ></img>
                <input className='searchForm__input' placeholder='Фильм' type='text' required />
                <button className='searchForm__button' type='submit' ><img className='searchForm__button-ico' src={find} alt='стрелка поиска' ></img></button>
            </div>
            <div className='filterCheckbox'>
                <label className='filterCheckbox__switch'>
                    <input className='filterCheckbox__input' type='checkbox' />
                    <span className='filterCheckbox__slider'></span>
                </label>
                <p className='filterCheckbox__name'>Короткометражки</p>
            </div>
        </form >
    )
}