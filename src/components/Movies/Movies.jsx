// стили
import "./Movies.scss";

//компоненты
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";


const Movies = (props) => {
  const visibleButton = props.renderMovies.length === props.filtredMovies.length;
  return (
    <section className="movies">
      <SearchForm
        valueSearch={props.valueInputSearchMovies}
        setValueSearch={props.setValueInputSearchMovies}
        isShortMovies={props.isShortMovies}
        setIsShortMovies={props.setIsShortMovies}
        getFilteredMovies={props.getFilteredMovies} />

      {
        props.isLoading
          ? <Preloader />
          : (props.movies.length < 1
            ? <h2 className="movies__title-info">Для отображения фильмов воспользуйтесь поиском</h2>
            : <>
              {props.filtredMovies.length <1 
              ? <h2 className="movies__title-info">Фильмы не найдены</h2>
              : 
              <MoviesCardList>
                {props.renderMovies.map((movie) =>
                  <MoviesCard
                    movie={movie}
                    savedMovies={props.savedMovies}
                    saveOrRemoveMovie={props.saveOrRemoveMovie}
                    key={movie.id} />)}
              </MoviesCardList>
              }
              {props.isLoadingAddMovies 
              ? <Preloader /> 
              : (!visibleButton && <button type="button" onClick={props.addYetMovies} className="movies__btn">Ещё</button>)}
            </>)
      }
    </section>
  )
}

export default Movies;