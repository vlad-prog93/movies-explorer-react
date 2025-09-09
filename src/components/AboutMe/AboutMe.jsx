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
            <h2 className="aboutMe__title">Владислав</h2>
            <p className="aboutMe__job">Фронтенд-разработчик, 32 года</p>
            <p className="aboutMe__description">Я живу в Москве, закончил факультет автоматики в НИЯУ "МИФИ". У меня есть
              жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь шахматами. Недавно начал кодить. С 2014 года работаю в
              компании «АО «Корпорация «ВНИИЭМ». После того, как прошёл курс по веб-разработке параллельно работе начал делать pet-проекты</p>
            <a className="aboutMe__link" href="https://github.com/vlad-prog" target="_blank" rel="noreferrer">Github</a>
          </div>
          <Avatar className="aboutMe__img" />
        </div>
      </div>
    </section>
  )
}

export default AboutMe;
