// стили
import "./MyLabel.scss";

const MyLabel = (props) => {
  const classLabel = props.isInputDisabled ? "myLabel myLabel_disabled" : "myLabel";
  
  return (
    <label className={classLabel} htmlFor={props.nameInput} >{props.text}</label>
  )
}

export default MyLabel;
