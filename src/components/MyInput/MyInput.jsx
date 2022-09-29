// стили
import "./MyInput.scss";

const MyInput = (props) => {
  const classes = props.isValidInput ? "myInput" : "myInput myInput_error";

  return (
    <input 
    className={classes} 
    value={props.value}
    onChange={e => props.onChange(e)}
    onBlur={e => props.onBlur(e)}
    onFocus={e => props.onFocus(e)}
    id={props.nameInput} 
    type={props.type} 
    placeholder={props.placeholder}
    disabled={props.disabled} />
  )
}

export default MyInput;
