//стили
import "./SearchForm.scss";

// компоненты
import Search from "../../ImgComponents/Search";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
    return (
        <div className="search">
            <div className="search__container">
                <form className="search__form">
                    <div className="search__input-container">
                        <label className="search__icon" htmlFor="search"><Search /></label>
                        <input id="search" className="search__input" type="search" placeholder="Фильм" />
                        <button className="search__button " />
                        <div className="search__br" />
                    </div>
                    <div className="search__checkbox-container">
                        <FilterCheckbox />
                        <span className="search__checkbox-mark">Короткометражки</span>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SearchForm;
