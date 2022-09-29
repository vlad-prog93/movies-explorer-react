// стили
import "./Techs.scss";

const Techs = () => {
  const techs = ["HTML", "CSS", "JS", "React", "Git", "Express.js", "mongoDB"]
  
  return (
    <section className="techs">
        <div className="techs__container">
          <h2 className="about__title">Технологии</h2>
          <h3 className="techs__title">7 технологий</h3>
          <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
            проекте.</p>
          <ul className="techs__list">
            {techs.map((tech, ind) => <li key={ind} className="techs__item">{tech}</li>)}
          </ul>
        </div>
      </section>
  )
}

export default Techs;
