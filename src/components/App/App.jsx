import { Route, Routes, useNavigate, useRoutes } from "react-router-dom";
import { useState } from "react";

// стили
import "./App.scss";

// компоненты
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// улитилиты
import { paths } from "../../utils/constants";
import auth from '../../utils/auth';
import { useEffect } from "react";
import token from '../../utils/token';
import CurrentUserContext from '../../contexts/currentUserContext';
import mainApi from "../../utils/mainApi";
import moviesApi from "../../utils/moviesApi";
import { URL_MOVIES } from "../../utils/constants";


function App() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [burgerIsActive, setBurgerIsActive] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [authError, setAuthError] = useState(false);

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

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

  const getSavedMovies = async () => {
    try {
      const { movies } = await mainApi.getMovies();
      setSavedMovies(movies);
    } catch (e) {
      console.log(e);
    }
  }

  const saveOrRemoveMovie = async (dataMovie) => {
    
    const movies = savedMovies.filter((movie) => movie.movieId === dataMovie.id)
    if (movies.length !== 0) {
      await removeMovie(movies[0])
    } else {
      await saveMovie(dataMovie)
    }
  }

  const removeMovie = async (dataMovie) => {
    try {
      const { _id}  = await mainApi.removeMovie(dataMovie._id);
      setSavedMovies([...savedMovies.filter((movie) => toString(movie._id) !== toString(_id))]);
    } catch (e) {
      console.log(e);
    }
  }

  const saveMovie = async (dataMovie) => {
    try {
      const newMovie = {
        country: dataMovie.country,
        director: dataMovie.director,
        duration: dataMovie.duration,
        year: dataMovie.year,
        description: dataMovie.description,
        image: `${URL_MOVIES}${dataMovie.image.url}`,
        trailerLink: dataMovie.trailerLink,
        thumbnail: `${URL_MOVIES}${dataMovie.image.url}`,
        movieId: dataMovie.id,
        nameRU: dataMovie.nameRU,
        nameEN: dataMovie.nameEN
      }
      const {movie} = await mainApi.saveMovie(newMovie);
      setSavedMovies([...savedMovies, movie])
    } catch (e) {
      console.log(e);
    }
  }














  const signUp = async (name, email, password) => {
    try {
      await auth.signUp(name, email, password)
      await signIn(email, password);
      setAuthError(false);
    } catch (e) {
      setAuthError(true);
      console.log(e)
    }
  }

  const signIn = async (email, password) => {
    try {
      const res = await auth.signIn(email, password);
      token.set(res.token);
      await getUser();
      setIsLogin(true);
      navigate("/movies");
      setAuthError(false);
    } catch (e) {
      setAuthError(true);
      console.log(e)
    }
  }

  const signOut = (e) => {
    e.preventDefault();
    setIsLogin(false);
    token.remove();
    navigate("/");
  }

  const getUser = async () => {
    const user = await mainApi.getUser();
    setCurrentUser({ id: user._id, name: user.name, email: user.email });
  }

  const updateUser = async (name, email) => {
    try {
      const res = await mainApi.updateUser(name, email)
      setCurrentUser({ ...currentUser, name: res.name, email: res.email });
    } catch(e) {
      setAuthError(true);
      console.log(e);
    }
  }

  const toggleBurger = (e) => {
    setBurgerIsActive(!burgerIsActive)
  }

  const RoutesHeader = () => useRoutes(
    [paths.home, paths.movies, paths.savedMovies, paths.profile].map((path, ind) => {
      return { path: path, element: <Header isLogin={isLogin} burgerIsActive={burgerIsActive} toggleBurger={toggleBurger} />, key: ind }
    }
    ))

  const RoutesFooter = () => useRoutes(
    [paths.home, paths.movies, paths.savedMovies].map((path, ind) => {
      return { path: path, element: <Footer />, key: ind}
    }
    ))

  const tokenCheck = async () => {
    const jwt = token.get();
    if (jwt) {
      try {
        setIsLogin(true);
        getUser();
      } catch (err) {
        navigate("/")
        console.error(err);
      }
    }
  };

  useEffect(() => {
    tokenCheck();
  }, [isLogin])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <RoutesHeader />
      <Routes>
        <Route path={paths.home} element={<Main burgerIsActive={burgerIsActive} toggleBurger={toggleBurger} />} />
        <Route path={paths.signUp} element={<Register authError={authError} signUp={signUp} />} />
        <Route path={paths.signIn} element={<Login authError={authError} signIn={signIn} />} />
        <Route path={paths.movies} element={<ProtectedRoute component={Movies} saveOrRemoveMovie={saveOrRemoveMovie} getSavedMovies={getSavedMovies} movies={movies} getMovies={getMovies} isLogin={isLogin} savedMovies={savedMovies} setSavedMovies={setSavedMovies} burgerIsActive={burgerIsActive} toggleBurger={toggleBurger} />} />
        <Route path={paths.savedMovies} element={<ProtectedRoute component={SavedMovies} removeMovie={removeMovie} getSavedMovies={getSavedMovies}  savedMovies={savedMovies} setSavedMovies={setSavedMovies} isLogin={isLogin} burgerIsActive={burgerIsActive} toggleBurger={toggleBurger} />} />
        <Route path={paths.profile} element={<ProtectedRoute component={Profile} isLogin={isLogin} updateUser={updateUser} signOut={signOut} />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <NavBar isActive={burgerIsActive} toggleMenu={e => toggleBurger(e)} />
      <RoutesFooter />
    </CurrentUserContext.Provider>
  );
}

export default App;
