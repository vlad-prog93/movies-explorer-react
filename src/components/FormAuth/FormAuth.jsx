import { NavLink, useLocation } from "react-router-dom";

// стили
import "./FormAuth.scss";

// компоненты
import MyButton from "../MyButton/MyButton";

const FormAuth = (props) => {
  const location = useLocation();
  return (
    <form className="auth__form">
      <div className="auth__inputs-container">
        {props.children}
      </div>
      <div className="register__auth-container">
        {location.pathname === "/signup"
          ?
          <div className="auth__submit-container">
            <p className="auth__error">{props.authError && "Что-то пошло не так"} </p>
            <MyButton onClick={e => props.signUp(e)} disabled={ !props.name.isValidInput || !props.email.isValidInput || !props.password.isValidInput}>Зарегистрироваться</MyButton>
            <p className="auth__text">
              Уже зарегистрированы? <NavLink className="auth__link" to="/signin">Войти</NavLink>
            </p>
          </div>
          :
          <div className="auth__submit-container">
            <p className="auth__error">{props.authError && "Что-то пошло не так"} </p>
            <MyButton onClick={e => props.signIn(e)} disabled={ !props.email.isValidInput || !props.password.isValidInput }>Войти</MyButton>
            <p className="auth__text">
              Уже зарегистрированы? <NavLink className="auth__link" to="/signup">Регистрация</NavLink>
            </p>
          </div>
        }
      </div>
    </form>
  )
}

export default FormAuth;
