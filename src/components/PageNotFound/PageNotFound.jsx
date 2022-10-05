import { NavLink, useNavigate } from "react-router-dom";

// стили
import "./PageNotFound.scss";

const PageNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <section className="pageError">
      <h1 className="pageError__title">404</h1>
      <p className="pageError__info">Страница не найдена</p>
      <NavLink className="pageError__link" to={navigate(-1)}>Назад</NavLink>
    </section>
  )
}

export default PageNotFound;
