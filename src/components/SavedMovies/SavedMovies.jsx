//стили
import "./SavedMovies.scss";

//компоненты
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

//Временно карточки
import Card1 from "../../images/png_films/film_1.png";
import Card3 from "../../images/png_films/film_3.png";
import Card7 from "../../images/png_films/film_7.png";

const SavedMovies = () => {

  return (
    <>
      <SearchForm />
      <MoviesCardList>
        <MoviesCard src={Card1} save={true} name="33 слова о дизайне" time={"1ч42м"} />
        <MoviesCard src={Card3} save={true} name="33 слова о дизайне" time={"1ч42м"} />
        <MoviesCard src={Card7} save={true} name="33 слова о дизайне" time={"1ч42м"} />
      </MoviesCardList>
    </>
  )
}

export default SavedMovies;
