import { useEffect, useState } from "react";

// стили
import "./Movies.scss";

//компоненты
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

const Movies = (props) => {

  useEffect(() => {
    const fetchData = async () => {
      await props.getSavedMovies();
      console.log("Вызавается она")
    }
    fetchData();
  }, [])


  return (
    <>
      <SearchForm getMovies={props.getMovies} />
      {props.movies.length < 1
        ? <h1>Нажмите на "Ещё", чтобы показать карточки</h1>
        : <>
        <MoviesCardList>
        {props.movies.map((movie) => <MoviesCard movie={movie} savedMovies={props.savedMovies} saveOrRemoveMovie={props.saveOrRemoveMovie} key={movie.id} />)}
        </MoviesCardList>
        <button type="button" onClick={props.getMovies} className="movies__btn">Ещё</button>
        </>
      }
      
    </>
  )
}

export default Movies;