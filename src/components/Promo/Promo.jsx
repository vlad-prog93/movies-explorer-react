import { NavLink } from "react-router-dom";

// стили
import "./Promo.scss";

//компоненты
import Web from "../../ImgComponents/Web";

const Promo = () => {
  return (
    <section className="promo">
       <div className="promo__container">
         <div className="promo__info">
           <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
           <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
           <NavLink className="promo__link" to="#AboutProject">Узнать больше</NavLink>
         </div>
         <Web className="promo__img" />
       </div>
    </section>
  )
}

export default Promo;
