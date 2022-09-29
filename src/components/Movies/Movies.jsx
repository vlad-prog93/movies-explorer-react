// стили
import "./Movies.scss";

//компоненты
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

// временно карточки
import Card1 from "../../images/png_films/film_1.png";
import Card2 from "../../images/png_films/film_2.png";
import Card3 from "../../images/png_films/film_3.png";
import Card4 from "../../images/png_films/film_4.png";
import Card7 from "../../images/png_films/film_7.png";

const Movies = () => {

  return (
    <>
      <SearchForm />
      <MoviesCardList>
        <MoviesCard src={Card1} save={true} name="33 слова о дизайне" time={"1ч42м"} />
        <MoviesCard src={Card2} name="33 слова о дизайне" time={"1ч42м"} />
        <MoviesCard src={Card3} save={true} name="33 слова о дизайне" time={"1ч42м"} />
        <MoviesCard src={Card4} name="33 слова о дизайне" time={"1ч42м"} />
        <MoviesCard src={Card7} name="33 слова о дизайне" time={"1ч42м"} />
      </MoviesCardList>
      <button className="movies__btn">Ещё</button>
    </>
  )
}

export default Movies;