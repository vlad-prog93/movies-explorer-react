import web from '../../../images/intro/web.svg';

const Intro = () => {
  return (
    <section className='intro'>
      <div className='intro__info'>
        <div className='intro__texts'>
          <h1 className='intro__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className='intro__description'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img className='intro__image' src={web} alt='web' />
      </div>
      <a className='intro__link' href='#About'>Узнать больше</a>
    </section>
  )
}

export default Intro