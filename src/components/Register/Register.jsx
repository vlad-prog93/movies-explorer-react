import { useState } from "react";
import { Navigate } from "react-router-dom";

// стили
import "./Register.scss";

// компоненты
import Logo from "../../ImgComponents/Logo";
import MyInput from "../MyInput/MyInput";
import MyLabel from "../MyLabel/MyLabel";
import TitleAuth from "../TitleAuth/TitleAuth";
import FormAuth from "../FormAuth/FormAuth";

// хуки
import useInput from "../../hooks/useInput";

// утилиты
import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from "../../utils/constants";


const Register = (props) => {
  const name = useInput("", {isEmpty: true});
  const email = useInput("", {isEmail: true});
  const password = useInput("", {minLength: MIN_LENGTH_PASSWORD, maxLength: MAX_LENGTH_PASSWORD});
  const [isLoading, setIsLoading] = useState(false)

  const signUp = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await props.signUp(name.value, email.value, password.value)
    setIsLoading(false)
  }

  if (props.isLogin) {
    return <Navigate to="/" />
  }

  return (
    <section className="auth">
      <Logo className="auth__logo" />
      <TitleAuth>Добро пожаловать!</TitleAuth>
      <FormAuth isLoading={isLoading} authError={props.authError} signUp={signUp} name={name} email={email} password={password}>
        <MyLabel  nameInput="name" text="Имя" />
        <MyInput isValidInput={name.isValidInput} value={name.value || ""} onBlur={e => name.onBlur(e)} onFocus={e => name.onFocus(e)}  onChange={e => name.onChange(e)} nameInput="name" type="text" placeholder="Введите имя" />
        { name.isEmptyError.state && (name.isDirty || name.isFocus ) && <span className="auth__message-error">{name.isEmptyError.message}</span> }
        <MyLabel nameInput="Email" text="E-mail" />
        <MyInput isValidInput={email.isValidInput} value={email.value} onBlur={e => email.onBlur(e)} onFocus={e => email.onFocus(e)} onChange={e => email.onChange(e)} nameInput="Email" type="text" placeholder="Введите e-mail" />
        { email.isEmailError.state && (email.isDirty || email.isFocus ) && <span className="auth__message-error">{email.isEmailError.message}</span> }
        <MyLabel nameInput="password" text="Пароль" />
        <MyInput isValidInput={password.isValidInput} value={password.value} onBlur={e => password.onBlur(e)} onFocus={e => password.onFocus(e)} onChange={e => password.onChange(e)} nameInput="password" type="password" placeholder="Введите пароль" />
        { password.isMinLengthError.state && (password.isDirty || password.isFocus ) && <span className="auth__message-error">{password.isMinLengthError.message}</span> }
        { password.isMaxLengthError.state && (password.isDirty || password.isFocus ) && <span className="auth__message-error">{password.isMaxLengthError.message}</span> }
      </FormAuth>
    </section>
  )
}

export default Register;
