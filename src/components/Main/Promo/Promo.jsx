import web from '../../../images/promo/web.svg';

const Promo = () => {
  return (
    <section className='promo'>
      <div className='promo__info'>
        <div className='promo__texts'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className='promo__description'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img className='promo__image' src={web} alt='web' />
      </div>
      <a className='promo__link' href='#About'>Узнать больше</a>
    </section>
  )
}

export default Promo