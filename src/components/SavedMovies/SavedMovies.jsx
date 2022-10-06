//стили
import "./SavedMovies.scss";

//компоненты
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

const SavedMovies = (props) => {

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
            ? "Сохраненных фильмов нет"
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
