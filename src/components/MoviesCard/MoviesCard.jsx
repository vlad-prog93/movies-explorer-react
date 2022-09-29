import { useLocation } from "react-router-dom";

// стили
import "./MoviesCard.scss";


const MoviesCard = (props) => {
    const location = useLocation();
    const classBtn = props.save 
    ? (location.pathname==="/saved-movies" && "element__button element__button_remove") || "element__button element__button_save" 
    : "element__button"

    return (
        <article className="element">
            <img className="element__img" src={props.src} alt="movie" />
            <div className="element__info">
                <p className="element__title">{props.name}</p>
                <button className={classBtn} />
            </div>
            <span className="element__time">{props.time}</span>
        </article>
    )
};

export default MoviesCard;
