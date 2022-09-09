const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__info'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__ref-data'>
        <span className='footer__date'>&copy; {new Date().getFullYear()}</span>
        <ul className='foooter__lists'>
          <li className='foooter__list'>
            <a className='footer__link' href='https://practicum.yandex.ru'>Яндекс.Практикум</a>
          </li>
          <li className='foooter__list'>
            <a className='footer__link' href='https://github.com/vlad-prog93'>Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
