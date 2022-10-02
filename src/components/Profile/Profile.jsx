import { useState } from "react";

// стили
import "./Profile.scss";

// хуки
import useInput from "../../hooks/useInput";
import { useContext } from "react";
import currentUserContext from "../../contexts/currentUserContext";

const Profile = (props) => {
    const currentUser = useContext(currentUserContext);

    const name = useInput(currentUser.name, { isEmpty: true });
    const email = useInput(currentUser.email, { isEmail: true });

    const [isInputDisabled, setIsInputDisabled] = useState(true)
    const classInputName = name.isValidInput ? "profile__input" : "profile__input profile__input_error"
    const classInputEmail = email.isValidInput ? "profile__input" : "profile__input profile__input_error"
    const classLabel = !isInputDisabled ? "profile__label" : "profile__label_disabled"
    
    const editUser = (e) => {
        e.preventDefault()
        setIsInputDisabled(false)
    }

    const updateUser = (e) => {
        e.preventDefault()
        props.updateUser(name.value, email.value);
        setIsInputDisabled(true)
    }

    return (
        <>
            <section className="profile">
                <h1 className="profile__title">Привет, {name.value}!</h1>
                <form className="profile__form">
                    <div className="profile__inputs-container">
                        <label className={classLabel} htmlFor="name">Имя</label>
                        <input 
                        className={classInputName}
                        isValidInput={name.isValidInput} 
                        disabled={isInputDisabled} 
                        value={name.value} 
                        onBlur={e => name.onBlur(e)} 
                        onFocus={e => name.onFocus(e)} 
                        onChange={e => name.onChange(e)} 
                        id="name" 
                        type="text" 
                        placeholder="Введите имя" 
                        />
                        {name.isEmptyError.state && (name.isDirty || name.isFocus) && <span className="auth__message-error">{name.isEmptyError.message}</span>}
                        <label className={classLabel} htmlFor="Email">E-mail</label>
                        <input 
                        className={classInputEmail}
                        isValidInput={email.isValidInput} 
                        disabled={isInputDisabled}  
                        value={email.value} 
                        onBlur={e => email.onBlur(e)} 
                        onFocus={e => email.onFocus(e)} 
                        onChange={e => email.onChange(e)} 
                        nameInput="Email" type="text" 
                        placeholder="Введите e-mail" 
                        />
                        {email.isEmailError.state && (email.isDirty || email.isFocus) && <span className="auth__message-error">{email.isEmailError.message}</span>}
                    </div>
                    {!isInputDisabled 
                    ? <button onClick={e => updateUser(e)} className="profile__btn-edit" disabled={ !email.isValidInput || !name.isValidInput }>Сохранить</button>
                    : <button onClick={e => editUser(e)} className="profile__btn-edit">Редактировать</button>
                    }
                </form>
                <button onClick={e => props.signOut(e)} className="profile__btn-exit">Выйти из аккаунта</button>
            </section>
        </>
    )
}

export default Profile;
