import { useLocation } from "react-router-dom";

// стили
import "./Header.scss";

// компоненты
import Logo from "../../ImgComponents/Logo";
import Navigation from "../Navigation/Navigation";

const Header = ({ burgerIsActive, toggleBurger, isLogin }) => {
  const location = useLocation();
  const classHeader = location.pathname === "/" ? "header" : "header header_white";
  const classHeaderContainer = location.pathname === "/" ? "header__container" : "header__container header__container_white";

  return (
        <header className={classHeader}>
          <div className={classHeaderContainer}>
            <Logo />
            <Navigation isLogin={isLogin} burgerIsActive={burgerIsActive} toggleBurger={e => toggleBurger(e)} />
          </div>
        </header >
  )
};

export default Header;
