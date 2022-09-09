const About = () => {
  return (
    <section className='about' id="About">
      <h2 className='subtitle'>О проекте</h2>
      <ul className='about__lists'>
        <li className='about__list'>
          <h3 className='about__list-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about__list-description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='about__list'>
          <h3 className='about__list-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about__list-description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className='about__diagram'>
        <div className='about__diagram-item'>1 неделя</div>
        <div className='about__diagram-item'>4 недели</div>
        <div className='about__diagram-item'>Back-end</div>
        <div className='about__diagram-item'>Front-end</div>
      </div>
    </section>
  )
}

export default About