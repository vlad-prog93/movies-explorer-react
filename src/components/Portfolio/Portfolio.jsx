// стили
import "./Portfolio.scss";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a className="portfolio__item-link" href="https://github.com/vlad-prog93/how-to-learn" target="_blank" rel="noreferrer">
              <span className="portfolio__item-text">Статичный сайт</span>
              <span className="portfolio__item-icon">↗</span>
            </a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__item-link" href="https://github.com/vlad-prog93/adaptive-site-project" target="_blank" rel="noreferrer">
              <span className="portfolio__item-text">Адаптивный сайт</span>
              <span className="portfolio__item-icon">↗</span>
            </a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__item-link" href="https://github.com/vlad-prog93/react-mesto-api-full" target="_blank" rel="noreferrer">
              <span className="portfolio__item-text">Одностраничное приложение</span>
              <span className="portfolio__item-icon">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;
