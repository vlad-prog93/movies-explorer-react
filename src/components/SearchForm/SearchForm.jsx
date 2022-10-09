import { useState } from "react"

//стили
import "./SearchForm.scss"

// компоненты
import Search from "../../ImgComponents/Search"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"

const SearchForm = ({getFilteredMovies, isShortMovies, setIsShortMovies, valueSearch, setValueSearch}) => {  
    const [isDisabled, setIsdisabled] = useState(false)

    const getMovies = async (e) => {
        e.preventDefault()
        setIsdisabled(true)
        await getFilteredMovies(isShortMovies, valueSearch)
        setIsdisabled(false)
    }

    return (
        <div className="search">
            <div className="search__container">
                <form className="search__form">
                    <div className="search__input-container">
                        <label className="search__icon" htmlFor="search"><Search /></label>
                        <input autoComplete="off" value={valueSearch} onChange={e => setValueSearch(e.target.value)} id="search" className="search__input" type="search" placeholder="Фильм" />
                        <button onClick={e => getMovies(e)} className="search__button" disabled={isDisabled} />
                        <div className="search__br" />
                    </div>
                    <div className="search__checkbox-container">
                        <FilterCheckbox checked={isShortMovies} onChange={() => setIsShortMovies(!isShortMovies)} disabled={isDisabled}/>
                        <span className="search__checkbox-mark">Короткометражки</span>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SearchForm;
