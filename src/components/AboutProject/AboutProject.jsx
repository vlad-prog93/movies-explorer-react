// стили
import "./AboutProject.scss";

const AboutProject = () => {
  return (
    <section id="AboutProject" className="about">
      <div className="about__container">
        <h2 className="about__title">О проекте</h2>
        <ul className="about__list">
          <li className="about__item">
            <h3 className="about__item-title">Дипломный проект включал 5 этапов</h3>
            <p className="about__item-description">Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.</p>
          </li>
          <li className="about__item">
            <h3 className="about__item-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about__item-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <ul className="about__list-diag">
          <li className="about__item-diag">1 неделя</li>
          <li className="about__item-diag">4 недели</li>
          <li className="about__item-diag about__item-diag_grey">Back-end</li>
          <li className="about__item-diag about__item-diag_grey">Front-end</li>
        </ul>
      </div>
    </section>
  )
}

export default AboutProject;
