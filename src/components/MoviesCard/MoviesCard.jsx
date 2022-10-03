import { useLocation } from "react-router-dom";
import { URL_MOVIES } from "../../utils/constants";

// стили
import "./MoviesCard.scss";


// utils
import { convertTime } from "../../utils/tools";


const MoviesCard = (props) => {
    const location = useLocation();
    const isSave = props.savedMovies && props.savedMovies.find((movie) => movie.movieId === props.movie.id);
    const classBtn = isSave
    ? "element__button element__button_save" 
    : "element__button"
    const srcImg = location.pathname === "/movies" 
    ? `${URL_MOVIES}${props.movie.image.url}` 
    : `${props.movie.image}`

    return (
        <article className="element">
            <img className="element__img" src={srcImg} alt="movie" />
            <div className="element__info">
                <p className="element__title">{props.movie.nameRU}</p>
                {location.pathname === "/movies" && <button onClick={e => props.saveOrRemoveMovie(props.movie)} type="button" className={classBtn} />}
                {location.pathname === "/saved-movies" && <button onClick={e => props.removeMovie(props.movie)} type="button" className="element__button element__button_remove" />}
            </div>
            <span className="element__time">{convertTime(props.movie.duration)}</span>
        </article>
    )
};

export default MoviesCard;
