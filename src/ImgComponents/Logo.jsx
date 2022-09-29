import { Link } from 'react-router-dom';
import img from '../images/logo.svg';

const Logo = (props) => {
  return (
      <Link to="/"><img src={img} alt="logo" {...props} /></Link>
  )
};

export default Logo;
