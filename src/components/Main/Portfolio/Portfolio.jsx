const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h2 className='porfolio__title'>Портфолио</h2>
      <ul className='portfolio__lists'>
        <li className='portfolio__list'>
          <a href="https://github.com/vlad-prog93/how-to-learn" className='portfolio__link'>
            <span>Статичный сайт</span>
            <span>↗</span>
          </a>
        </li>
        <li className='portfolio__list'>
          <a href="https://github.com/vlad-prog93/adaptive-site-project" className='portfolio__link'>
            <span>Адаптивный сайт</span>
            <span>↗</span>
          </a>
        </li>
        <li className='portfolio__list'>
          <a href="https://github.com/vlad-prog93/react-mesto-api-full" className='portfolio__link'>
            <span>Одностраничное приложение</span>
            <span>↗</span>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
