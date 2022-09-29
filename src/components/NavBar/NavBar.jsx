import { NavLink } from "react-router-dom";

// стили
import "./NavBar.scss";

// компоненты
import Account from "../../ImgComponents/Account";

const NavBar = (props) => {
    const classMenuContainer = props.isActive ? "menu-container active" : "menu-container";
    
    return (
        <section className={classMenuContainer} onClick={props.toggleMenu}>
            <nav className="nav-menu">
                <ul className="nav-menu__list">
                    <li className="nav-menu__item">
                        <NavLink className="nav-menu__link" to="/">Главная</NavLink>
                    </li>
                    <li className="nav-menu__item active">
                        <NavLink className="nav-menu__link" to="/movies">Фильмы</NavLink>
                    </li>
                    <li className="nav-menu__item">
                        <NavLink className="nav-menu__link" to="/saved-movies">Сохранённые фильмы</NavLink>
                    </li>
                </ul>
                <NavLink className="nav-menu__link-account" to="/profile">
                    <span>Аккаунт</span>
                    <Account className="nav-menu__account" alt="icon" />
                </NavLink>
            </nav>
        </section>
    )
}

export default NavBar;
