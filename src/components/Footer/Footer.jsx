import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__info">
          <span className="footer__date">&#169; {new Date().getFullYear()}</span>
          <nav className="footer__nav">
            <a className="footer__nav-link" href="practicum.yandex.ru/">Яндекс.Практикум</a>
            <a className="footer__nav-link" href="https://github.com/vlad-prog93">Github</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
