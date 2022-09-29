// стили
import "./MoviesCardList.scss";

const MoviesCardList = ({children}) => {
    return (
        <section className="elements">
            {children}
        </section>
    )
};

export default MoviesCardList;
