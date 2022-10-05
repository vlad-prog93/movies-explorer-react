import {useState, useEffect} from "react";

//стили
import "./SavedMovies.scss";

//компоненты
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

const SavedMovies = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await props.getSavedMovies();
    }
    fetchData();
  }, [])

  return (
    <>
      <SearchForm getFilteredSavedMovies={props.getFilteredSavedMovies} />
      {isLoading 
      ? "Идет загрузка" 
      :
      <MoviesCardList>
        {props.filtredSavedMovies.length < 1 ? "Сохраненных фильмов нет" : props.filtredSavedMovies.map((movie) => <MoviesCard movie={movie} removeMovie={props.removeMovie} key={movie._id} />)}
      </MoviesCardList>
      }
    </>
  )
}

export default SavedMovies;
