import { Link } from "react-router-dom";

// стили
import "./PageNotFound.scss";

const PageNotFound = () => {

  return (
    <section className="pageError">
      <h1 className="pageError__title">404</h1>
      <p className="pageError__info">Страница не найдена</p>
      <Link className="pageError__link" to={-1}>Назад</Link>
    </section>
  )
}

export default PageNotFound;
