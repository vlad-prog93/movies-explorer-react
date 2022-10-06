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

// хуки
import useScreenSize from "../../hooks/useScreenSize";
import useAddMovies from "../../hooks/useAddMovies";



const App = () => {
  const windowSize = useScreenSize();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadIn, setIsLoadIn] = useState(true);

  const [isLogin, setIsLogin] = useState(false);
  const [burgerIsActive, setBurgerIsActive] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [authError, setAuthError] = useState(false);

  const [movies, setMovies] = useState([]);
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [renderMovies, setRenderMovies] = useState([]);

  const [savedMovies, setSavedMovies] = useState([]);
  const [filtredSavedMovies, setFiltredSavedMovies] = useState([]);

  const [valueInputSearchMovies, setValueInputSearchMovies] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);

  const [valueInputSearchSavedMovies, setValueInputSearchSavedMovies] = useState('');
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);

  const [addYetMovies, getYetMovies] = useAddMovies(windowSize.width);

  const getMovies = async () => {
    try {
      setIsLoading(true);
      const movies = await moviesApi.get();
      setMovies(movies);
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (windowSize.width >= 1280) {
      setRenderMovies(filtredMovies.slice(0, getYetMovies["1280"]))
    } else if (windowSize.width >= 768) {
      setRenderMovies(filtredMovies.slice(0, getYetMovies["768"]))
    } else if (windowSize.width >= 320) {
      setRenderMovies(filtredMovies.slice(0, getYetMovies["320"]))
    }
  }, [windowSize, filtredMovies, getYetMovies])

  const getFilteredMovies = (shortMovies, valueSearch) => {
    const filtredOnShortMovies = shortMovies ? movies.filter((movie) => movie.duration <= 40) : movies;
    const filtredOnTextAndShortMovies = filtredOnShortMovies.filter((movie) => movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase()));
    setFiltredMovies(filtredOnTextAndShortMovies)
  }

  const getSavedMovies = async () => {
    try {
      setIsLoading(true);
      const { movies } = await mainApi.getMovies();
      setSavedMovies(movies);
      setFiltredSavedMovies(movies);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  const getFilteredSavedMovies = (shortMovies, valueSearch) => {
    const filtredOnShortSavedMovies = shortMovies ? savedMovies.filter((movie) => movie.duration <= 40) : savedMovies;
    const filtredOnTextAndShortMovies = filtredOnShortSavedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase()));
    setFiltredSavedMovies(filtredOnTextAndShortMovies);
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
      const { _id } = await mainApi.removeMovie(dataMovie._id);
      setSavedMovies([...savedMovies.filter((movie) => movie._id !== _id)]);
      setFiltredSavedMovies([...savedMovies.filter((movie) => movie._id !== _id)])
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
      const { movie } = await mainApi.saveMovie(newMovie);
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
    } catch (e) {
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
      return { path: path, element: <Footer />, key: ind }
    }
    ))

  const tokenCheck = async () => {
    const jwt = token.get();
    if (jwt) {
      try {
        getUser();
        setIsLogin(true);
      } catch (err) {
        navigate("/")
        console.error(err);
      } finally {
        setIsLoadIn(false);
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
        <Route path={paths.movies} element={<ProtectedRoute
          component={Movies}
          renderMovies={renderMovies}
          valueInputSearchMovies={valueInputSearchMovies}
          setValueInputSearchMovies={setValueInputSearchMovies}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
          isLoading={isLoading}
          filtredMovies={filtredMovies}
          getFilteredMovies={getFilteredMovies}
          saveOrRemoveMovie={saveOrRemoveMovie}
          getSavedMovies={getSavedMovies}
          movies={movies}
          getMovies={getMovies}
          isLogin={isLogin}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          burgerIsActive={burgerIsActive}
          toggleBurger={toggleBurger}
          addYetMovies={addYetMovies}
          isLoadIn={isLoadIn} />} />
        <Route path={paths.savedMovies} element={<ProtectedRoute
          component={SavedMovies}
          valueInputSearchSavedMovies={valueInputSearchSavedMovies}
          setValueInputSearchSavedMovies={setValueInputSearchSavedMovies}
          isShortSavedMovies={isShortSavedMovies}
          setIsShortSavedMovies={setIsShortSavedMovies}
          isLoading={isLoading}
          filtredSavedMovies={filtredSavedMovies}
          removeMovie={removeMovie}
          getSavedMovies={getSavedMovies}
          savedMovies={savedMovies}
          getFilteredSavedMovies={getFilteredSavedMovies}
          setSavedMovies={setSavedMovies}
          isLogin={isLogin}
          burgerIsActive={burgerIsActive}
          toggleBurger={toggleBurger}
          isLoadIn={isLoadIn} />} />
        <Route path={paths.profile} element={<ProtectedRoute component={Profile} isLogin={isLogin} updateUser={updateUser} signOut={signOut} />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <RoutesFooter />
      <NavBar isActive={burgerIsActive} toggleMenu={e => toggleBurger(e)} />
    </CurrentUserContext.Provider>
  );
}

export default App;
