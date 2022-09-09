import aboutMeImage from '../../../images/aboutMe/avatar.png'

const AboutMe = () => {
  return (
    <section className='aboutMe'>
      <h2 className='subtitle'>Студент</h2>
      <div className='aboutMe__container'>
        <div className='aboutMe__texts'>
          <h3 className='aboutMe__title'>Виталий</h3>
          <p className='aboutMe__subtitle'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutMe__description'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a href='https://github.com/vlad-prog93' className='aboutMe__link'>Github</a>
        </div>
        <img className='aboutMe__image' src={aboutMeImage} alt='avatar' />
      </div>
    </section>
  )
}

export default AboutMe