import { useEffect, useState } from "react";

// стили
import "./Movies.scss";

//компоненты
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import useScreenSize from "../../hooks/useScreenSize";

const Movies = (props) => {
  const windowSize = useScreenSize();

  const getSize = (e) => {
    console.log(windowSize.width);
  }



  useEffect(() => {
    const fetchData = async () => {
      await props.getSavedMovies();
      await props.getMovies();
    }
    fetchData();
  }, [])


  return (
    <>
      <SearchForm getFilteredMovies={props.getFilteredMovies} />
      {props.filtredMovies.length < 1
        ? <h1>Нажмите на "Ещё", чтобы показать карточки</h1>
        : <>
        <MoviesCardList>
        {props.filtredMovies.map((movie) => <MoviesCard movie={movie} savedMovies={props.savedMovies} saveOrRemoveMovie={props.saveOrRemoveMovie} key={movie.id} />)}
        </MoviesCardList>
        <button type="button" onClick={e => getSize(e)} className="movies__btn">Ещё</button>
        </>
      }
      
    </>
  )
}

export default Movies;