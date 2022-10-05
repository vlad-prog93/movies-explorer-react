import { useEffect, useState } from "react";

// стили
import "./Movies.scss";

//компоненты
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";


const Movies = (props) => {

  useEffect(() => {
    const fetchData = async () => {
      await props.getSavedMovies();
      await props.getMovies();
    }
    fetchData();
  }, [])


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
          : (props.renderMovies.length < 1
            ? <h1>Ничего не найдено</h1>
            : <>
              <MoviesCardList>
                {props.renderMovies.map((movie) => <MoviesCard movie={movie} savedMovies={props.savedMovies} saveOrRemoveMovie={props.saveOrRemoveMovie} key={movie.id} />)}
              </MoviesCardList>
              <button type="button" onClick={props.addYetMovies} className="movies__btn">Ещё</button>
            </>)
      }
    </section>
  )
}

export default Movies;