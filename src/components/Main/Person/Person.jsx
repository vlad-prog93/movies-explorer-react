import personImage from '../../../images/person/avatar.png'

const Person = () => {
  return (
    <section className='person'>
      <h2 className='subtitle'>Студент</h2>
      <div className='person__container'>
        <div className='person__texts'>
          <h3 className='person__title'>Виталий</h3>
          <p className='person__subtitle'>Фронтенд-разработчик, 30 лет</p>
          <p className='person__description'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a href='https://github.com/vlad-prog93' className='person__link'>Github</a>
        </div>
        <img className='person__image' src={personImage} alt='avatar' />
      </div>
    </section>
  )
}

export default Person