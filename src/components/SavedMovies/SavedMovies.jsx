import { useEffect } from "react"

//стили
import "./SavedMovies.scss"

//компоненты
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import MoviesCard from "../MoviesCard/MoviesCard"
import Preloader from "../Preloader/Preloader"

const SavedMovies = (props) => {

  useEffect(() => {
    if (props.filtredSavedMovies.length !== 0) {
      props.getFilteredSavedMovies(props.isShortSavedMovies, props.valueInputSearchSavedMovies)
    }
  }, [])


  return (
    <section className="movies">
      <SearchForm
        valueSearch={props.valueInputSearchSavedMovies}
        setValueSearch={props.setValueInputSearchSavedMovies}
        isShortMovies={props.isShortSavedMovies}
        setIsShortMovies={props.setIsShortSavedMovies}
        getFilteredMovies={props.getFilteredSavedMovies} />
      
      {
        props.isLoading
          ? <Preloader />
          : (props.filtredSavedMovies.length < 1
            ? <h2 className="movies__title-info">Сохраненных фильмов нет</h2>
            : <MoviesCardList>
              {props.filtredSavedMovies.map((movie) => 
              <MoviesCard 
              movie={movie} 
              removeMovie={props.removeMovie} 
              key={movie._id} />)}
            </MoviesCardList>)
      }
    </section>
  )
}

export default SavedMovies;
