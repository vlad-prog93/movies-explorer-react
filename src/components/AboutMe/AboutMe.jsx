// стили
import "./AboutMe.scss";

// компоненты
import Avatar from "../../ImgComponents/Avatar";

const AboutMe = () => {
  return (
    <section className="aboutMe">
      <div className="aboutMe__container">
        <h2 className="about__title">Студент</h2>
        <div className="aboutMe_wrapper">
          <div className="aboutMe__info">
            <h2 className="aboutMe__title">Виталий</h2>
            <p className="aboutMe__job">Фронтенд-разработчик, 30 лет</p>
            <p className="aboutMe__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть
              жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
              компании
              «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с
              постоянной работы.</p>
            <a className="aboutMe__link" href="https://github.com/vlad-prog" target="_blank" rel="noreferrer">Github</a>
          </div>
          <Avatar className="aboutMe__img" />
        </div>
      </div>
    </section>
  )
}

export default AboutMe;
