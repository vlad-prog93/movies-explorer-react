import "./MyButton.scss";

const MyButton = (props) => {
    return (
        <button disabled={ props.disabled } className="mybutton" {...props}>{props.children}</button>
    )
}

export default MyButton;
