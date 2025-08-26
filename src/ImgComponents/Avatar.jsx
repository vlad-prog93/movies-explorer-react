import img from "../images/avatar.png";

const Avatar = (props) => {
  return (
    <img alt="avatar" {...props} src={img} />
  )
};

export default Avatar;
