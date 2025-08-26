import { useState } from "react"

// стили
import "./Profile.scss"

// хуки
import useInput from "../../hooks/useInput"
import { useContext } from "react"
import currentUserContext from "../../contexts/currentUserContext"

// компоненты 
import MyButton from "../MyButton/MyButton"
import { useEffect } from "react"
import Preloader from "../Preloader/Preloader"

const Profile = (props) => {
    const currentUser = useContext(currentUserContext)

    const name = useInput(currentUser.name, { isEmpty: true })
    const email = useInput(currentUser.email, { isEmail: true })

    // при успешном изменении профиля
    const [success, setSuccess] = useState(false)

    // при ошибке изменения профиля
    const [error, setError] = useState(false)

    const [isInputDisabled, setIsInputDisabled] = useState(true)
    const [isDisabledBtn, setIsDisabledBtn] = useState(true)

    const classInputName = name.isValidInput ? "profile__input" : "profile__input profile__input_error"
    const classInputEmail = email.isValidInput ? "profile__input" : "profile__input profile__input_error"
    const classLabel = !isInputDisabled ? "profile__label" : "profile__label_disabled"

    const editUser = (e) => {
        e.preventDefault()
        setIsInputDisabled(false)
    }

    const updateUser = async (e) => {
        e.preventDefault()
        const res = await props.updateUser(name.value, email.value)
        if (res && res._id) {
            setSuccess(true)
            setError(false)
        } else {
            setSuccess(false)
            setError(true)
        }
        setIsInputDisabled(true)
    }

    const cancel = () => {
        setIsInputDisabled(true)
        name.setValue(currentUser.name)
        email.setValue(currentUser.email)
    }

    useEffect(() => {
        if (name.value === currentUser.name && email.value === currentUser.email) {
            setIsDisabledBtn(true)
        } else {
            setIsDisabledBtn(false)
        }
    }, [name.value, email.value, isInputDisabled])

    return (
        <>
            <section className="profile">
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
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
                    {props.isLoading
                        ? <Preloader />
                        :
                        !isInputDisabled
                            ? <>
                                <MyButton onClick={e => updateUser(e)} disabled={!email.isValidInput || !name.isValidInput || isDisabledBtn}>Сохранить</MyButton>
                                <MyButton onClick={e => cancel()}>Отмена</MyButton>
                            </>
                            : <>
                                {success && <p className="profile__success">Профиль успешно изменён</p>}
                                {error && <p className="profile__error">Ошибка при сохранении профиля</p>}
                                <button onClick={e => editUser(e)} className="profile__btn-edit">Редактировать</button>
                                <button onClick={e => props.signOut(e)} className="profile__btn-exit">Выйти из аккаунта</button>
                            </>
                    }
                </form>
            </section>
        </>
    )
}

export default Profile;
