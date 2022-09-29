import { Link, NavLink, useLocation } from "react-router-dom";

// стили
import "./Navigation.scss";

// компоненты
import Account from "../../ImgComponents/Account";

const Navigation = ({burgerIsActive, toggleBurger}) => {
    const classBtnBurger = burgerIsActive ? "burger-btn active" : "burger-btn";
    const location = useLocation();

    if (location.pathname === "/") {
        return (
            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link to="/signup" className="nav__link">Регистрация</Link>
                    </li>
                    <li className="nav__item">
                        <Link to="/signin" className="nav__link">Войти</Link>
                    </li>
                </ul>
            </nav>
        )
    }
    return (
        <>
            <nav className="nav nav_white">
                <ul className="nav__list nav__list_white">
                    <li className="nav__item nav__item_white">
                        <NavLink className="nav__link nav__link_white" to="/movies">Фильмы</NavLink>
                    </li>
                    <li className="nav__item nav__item_white">
                        <NavLink className="nav__link nav__link_white" to="/saved-movies">Сохранённые фильмы</NavLink>
                    </li>
                </ul>
                <NavLink className="nav__link nav__link-account" to="/profile">
                    <span>Аккаунт</span>
                    <Account className="nav__account" alt="icon" />
                </NavLink>
            </nav>
            
            <div className={classBtnBurger} onClick={e => toggleBurger(e)}>
                <span className="burger-btn__line"></span>
                <span className="burger-btn__line"></span>
                <span className="burger-btn__line"></span>
            </div>

        </>

    )
}

export default Navigation;
