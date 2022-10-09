import { useEffect, useState } from "react";


const useValidate = (value, validations) => {
    const [isEmptyError, setIsEmptyError] = useState({ state: false, message: "Поле не может быть пустым" });
    const [isMinLengthError, setIsMinLengthError] = useState({ state: false, message: "" });
    const [isMaxLengthError, setIsMaxLengthError] = useState({ state: false, message: "" });
    const [isEmailError, setIsEmailError] = useState({ state: false, message: "Введите Email" });
    const [isValidInput, setIsValidInput] = useState(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case "isEmpty":
                    value ? setIsEmptyError({ ...isEmptyError, state: false }) : setIsEmptyError({ ...isEmptyError, state: true });
                    break;
                case "minLength":
                    value.length < validations[validation]
                        ?
                        setIsMinLengthError({ state: true, message: `Поле не может быть менее ${validations[validation]} символов` })
                        :
                        setIsMinLengthError({ ...isMinLengthError, state: false });
                    break;
                case "maxLength":
                    value.length > validations[validation]
                        ?
                        setIsMaxLengthError({ state: true, message: `Поле не может быть более ${validations[validation]} символов` })
                        :
                        setIsMaxLengthError({ ...isMaxLengthError, state: false });
                    break;
                case "isEmail":
                    const isEmail = String(value).toLowerCase().match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
                    isEmail ? setIsEmailError({ ...isEmailError, state: false }) : setIsEmailError({ ...isEmailError, state: true });
                    break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmptyError.state || isMinLengthError.state || isMaxLengthError.state || isEmailError.state) {
            setIsValidInput(false);
        } else {
            setIsValidInput(true);
        }
    }, [isEmptyError, isMinLengthError, isMaxLengthError, isEmailError]);

    return {
        isEmptyError,
        isMinLengthError,
        isMaxLengthError,
        isEmailError,
        isValidInput
    }
};

export default useValidate;
