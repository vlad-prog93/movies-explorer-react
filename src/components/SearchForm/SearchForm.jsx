import { useState } from "react";
import { useLocation } from "react-router-dom";

//стили
import "./SearchForm.scss";

// компоненты
import Search from "../../ImgComponents/Search";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = (props) => {
    const location = useLocation();
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [valueSearch, setValueSearch] = useState('');

    const getMovies = (e, isShortMovies, valueSearch) => {
        e.preventDefault();
        if (location.pathname === "/movies") {
            props.getFilteredMovies(isShortMovies, valueSearch);
            //props.getMovies(isShortMovies, valueSearch);
        } else if (location.pathname === "/saved-movies") {
            props.getFilteredSavedMovies(isShortMovies, valueSearch);
        }
    }

    return (
        <div className="search">
            <div className="search__container">
                <form className="search__form">
                    <div className="search__input-container">
                        <label className="search__icon" htmlFor="search"><Search /></label>
                        <input value={valueSearch} onChange={(e) => setValueSearch(e.target.value)} id="search" className="search__input" type="search" placeholder="Фильм" />
                        <button onClick={e => getMovies(e, isShortMovies, valueSearch)} className="search__button " />
                        <div className="search__br" />
                    </div>
                    <div className="search__checkbox-container">
                        <FilterCheckbox checked={isShortMovies} onChange={() => setIsShortMovies(!isShortMovies)} />
                        <span className="search__checkbox-mark">Короткометражки</span>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SearchForm;
