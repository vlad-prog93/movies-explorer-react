import { Link, NavLink, useLocation } from "react-router-dom";

// стили
import "./Navigation.scss"

// компоненты
import Account from "../../ImgComponents/Account"

const Navigation = ({ burgerIsActive, toggleBurger, isLogin }) => {
    const location = useLocation()
    const classBtnBurger = burgerIsActive ? "burger-btn active" : "burger-btn"

    if (location.pathname === "/") {
        if (isLogin) {
            return (
                <>
                    <nav className="nav nav_login">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <NavLink className="nav__link" to="/movies">Фильмы</NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink className="nav__link" to="/saved-movies">Сохранённые фильмы</NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink className="nav__link nav__link-account nav__link-account_dark" to="/profile">
                                    <span>Аккаунт</span>
                                    <Account className="nav__account nav__account_dark" alt="icon" />
                                </NavLink>
                            </li>
                        </ul>

                    </nav>

                    <div className={classBtnBurger} onClick={e => toggleBurger(e)}>
                        <span className="burger-btn__line burger-btn__line_white"></span>
                        <span className="burger-btn__line burger-btn__line_white"></span>
                        <span className="burger-btn__line burger-btn__line_white"></span>
                    </div>
                </>
            )
        }
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
                        <NavLink className={(navData) => navData.isActive ? "nav__link nav__link_white nav__link_white_active" : " nav__link nav__link_white"} to="/movies">Фильмы</NavLink>
                    </li>
                    <li className="nav__item nav__item_white">
                        <NavLink className={(navData) => navData.isActive ? "nav__link nav__link_white nav__link_white_active" : " nav__link nav__link_white"} to="/saved-movies">Сохранённые фильмы</NavLink>
                    </li>
                </ul>
                <NavLink className={(navData) => navData.isActive ? "nav__link nav__link-account nav__link-account_active" : " nav__link nav__link-account"} to="/profile">
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
