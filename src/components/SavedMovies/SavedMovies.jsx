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
      <SearchForm />
      {isLoading 
      ? "Идет загрузка" 
      :
      <MoviesCardList>
        {props.savedMovies.length < 1 ? "Сохраненных фильмов нет" : props.savedMovies.map((movie) => <MoviesCard movie={movie} removeMovie={props.removeMovie} key={movie._id} />)}
      </MoviesCardList>
      }
    </>
  )
}

export default SavedMovies;
