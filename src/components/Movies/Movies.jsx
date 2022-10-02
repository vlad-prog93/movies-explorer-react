import { useState } from "react";

// стили
import "./Movies.scss";

//компоненты
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

// временно карточки
import moviesApi from "../../utils/moviesApi";
import { URL_MOVIES } from "../../utils/constants";

// утилиты
import { convertTime } from "../../utils/tools";


const Movies = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async (shortMovies, valueSearch) => {
    try {
      const movies = await moviesApi.get();
      const filtredOnShortMovies = shortMovies ? movies.filter((movie) => movie.duration <= 60) : movies;
      const filtredOnTextAndShortMovies = filtredOnShortMovies.filter((movie) => movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase()))
      console.log(filtredOnTextAndShortMovies)
      setMovies(filtredOnTextAndShortMovies)
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <>
      <SearchForm getMovies={getMovies} />
      {movies.length < 1
        ? <h1>Нажмите на "Ещё", чтобы показать карточки</h1>
        : <>
        <MoviesCardList>
        {movies.map((movie, ind) => <MoviesCard src={`${URL_MOVIES}${movie.image.url}`} save={true} name={movie.nameRU} time={convertTime(movie.duration)} key={ind} />)}
        </MoviesCardList>
        <button type="button" onClick={getMovies} className="movies__btn">Ещё</button>
        </>
      }
      
    </>
  )
}

export default Movies;