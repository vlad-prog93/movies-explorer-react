import { useState } from "react";
import useValidate from "./useValidate";

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const valid = useValidate(value, validations);

    const onChange = (e) => setValue(e.target.value);

    const onBlur = (e) => setIsDirty(true);

    const onFocus = (e) => setIsFocus(true);

    return {
        value,
        isDirty,
        isFocus,
        onChange,
        onBlur,
        onFocus,
        ...valid,
    }
}

export default useInput;
