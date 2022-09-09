import { Link } from 'react-router-dom';
import LogoImg from '../../images/header/logo.svg'


const Header = () => {
  return (
    <header className="header">
      <Link to="/"><img src={LogoImg} alt='logo' /></Link>
      <div className="header__auth-links">
        <Link className="header__auth-link" to="/signup">Регистрация</Link>
        <Link className="header__auth-link" to="/signin">Войти</Link>
      </div>
    </header>
  )
};

export default Header;
