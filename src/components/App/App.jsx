import { Route, Routes, useNavigate, useRoutes } from "react-router-dom"
import { useState } from "react"

// стили
import "./App.scss"

// компоненты
import Main from "../Main/Main"
import Register from "../Register/Register"
import Login from "../Login/Login"
import PageNotFound from "../PageNotFound/PageNotFound"
import Movies from "../Movies/Movies"
import Profile from "../Profile/Profile"
import SavedMovies from "../SavedMovies/SavedMovies"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import NavBar from "../NavBar/NavBar"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"

// улитилиты
import { paths } from "../../utils/constants"
import auth from '../../utils/auth'
import { useEffect } from "react"
import token from '../../utils/token'
import CurrentUserContext from '../../contexts/currentUserContext'
import mainApi from "../../utils/mainApi"
import moviesApi from "../../utils/moviesApi"
import { URL_MOVIES } from "../../utils/constants"

// хуки
import useAddMovies from "../../hooks/useAddMovies"



const App = () => {
  const navigate = useNavigate()

  // для загрузки фильмов
  const [isLoading, setIsLoading] = useState(false)

  // для защиты от перерендеринга в ProtectedRoute
  const [isLoadIn, setIsLoadIn] = useState(true)

  // для бургера меню
  const [burgerIsActive, setBurgerIsActive] = useState(false)

  // кладем в контекст
  const [currentUser, setCurrentUser] = useState({})

  // для отрисовки ошибок при регистрации и аунтентификации 
  const [authError, setAuthError] = useState(false)

  // логин
  const [isLogin, setIsLogin] = useState(false)

  // фильмы, отфильтрованные фильмы и отрисованные фильмы
  const [movies, setMovies] = useState([])
  const [filtredMovies, setFiltredMovies] = useState([])

  // сохраненные фильмы, отфильтрованные-отрисованные фильмы
  const [savedMovies, setSavedMovies] = useState([])
  const [filtredSavedMovies, setFiltredSavedMovies] = useState([])

  // значения формы поиска для фильмов - значение инпута, значение чекбокса
  const [valueInputSearchMovies, setValueInputSearchMovies] = useState('')
  const [isShortMovies, setIsShortMovies] = useState(false)

  // значения формы поиска для сохраненных фильмов - значение инпута, значение чекбокса
  const [valueInputSearchSavedMovies, setValueInputSearchSavedMovies] = useState('')
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false)

  // хук - отвечает за отрисовку отфильтрованных фильмов и обработку кнопки "еще"
  const [renderMovies, addYetMovies, isLoadingAddMovies] = useAddMovies(filtredMovies)

  const toggleBurger = (e) => setBurgerIsActive(!burgerIsActive)

  // действия связанные с фильмами
  const getMovies = async () => {
    try {
      if (movies.length === 0) {
        console.log('getMovies')
        setIsLoading(true)
        const movies = await moviesApi.get()
        setMovies(movies)
        return movies
      }
      return movies
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const getSavedMovies = async () => {
    try {
      const { movies } = await mainApi.getMovies()
      setSavedMovies(movies);
      getFilteredSavedMovies(isShortSavedMovies, valueInputSearchSavedMovies)
    } catch (e) {
      console.log(e)
    } 
  }



  const getFilteredMovies = async (shortMovies, valueSearch) => {
    const movies = await getMovies()
    const filtredOnShortMovies = shortMovies ? movies.filter((movie) => movie.duration <= 40) : movies
    const filtredOnTextAndShortMovies = filtredOnShortMovies.filter((movie) => movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase()))
    setFiltredMovies(filtredOnTextAndShortMovies)
  }

  const getFilteredSavedMovies = (shortMovies, valueSearch) => {
    const filtredOnShortSavedMovies = shortMovies ? savedMovies.filter((movie) => movie.duration <= 40) : savedMovies
    const filtredOnTextAndShortMovies = filtredOnShortSavedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase()))
    setFiltredSavedMovies(filtredOnTextAndShortMovies)
  }

  const saveOrRemoveMovie = async (dataMovie) => {
    const movies = savedMovies.filter((movie) => movie.movieId === dataMovie.id)
    if (movies.length !== 0) {
      await removeMovie(movies[0])
    } else {
      await saveMovie(dataMovie)
    }
    await getSavedMovies()
  }

  const removeMovie = async (dataMovie) => {
    try {
      const { _id } = await mainApi.removeMovie(dataMovie._id)
      setSavedMovies([...savedMovies.filter((movie) => movie._id !== _id)])
      setFiltredSavedMovies([...savedMovies.filter((movie) => movie._id !== _id)])
    } catch (e) {
      console.log(e)
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
      const { movie } = await mainApi.saveMovie(newMovie)
      setSavedMovies([...savedMovies, movie])
    } catch (e) {
      console.log(e)
    }
  }


  /////////////  действия связанные с user /////////////
  const signUp = async (name, email, password) => {
    try {
      await auth.signUp(name, email, password)
      await signIn(email, password)
      setAuthError(false)
    } catch (e) {
      setAuthError(true)
      console.log(e)
    }
  }

  const signIn = async (email, password) => {
    try {
      const res = await auth.signIn(email, password)
      token.set(res.token)
      await getUser()
      await getSavedMovies()
      setIsLogin(true)
      navigate("/movies")
      setAuthError(false)
    } catch (e) {
      setAuthError(true)
      console.log(e)
    }
  }

  const signOut = (e) => {
    e.preventDefault()
    setIsLogin(false)
    token.remove()
    navigate("/")
  }

  const getUser = async () => {
    const user = await mainApi.getUser()
    setCurrentUser({ id: user._id, name: user.name, email: user.email })
  }

  const updateUser = async (name, email) => {
    try {
      setIsLoading(true)
      const res = await mainApi.updateUser(name, email)
      setCurrentUser({ ...currentUser, name: res.name, email: res.email })
      console.log(res)
    } catch (e) {
      setAuthError(true)
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  // роуты для header
  const RoutesHeader = () => useRoutes(
    [paths.home, paths.movies, paths.savedMovies, paths.profile].map((path) => {
      return { path: path, element: <Header isLogin={isLogin} burgerIsActive={burgerIsActive} toggleBurger={toggleBurger} />, key: path }
    }
    ))

  // роуты для footer
  const RoutesFooter = () => useRoutes(
    [paths.home, paths.movies, paths.savedMovies].map((path) => {
      return { path: path, element: <Footer />, key: path }
    }
    ))

  // эффекты для чекбокса
  useEffect(() => {
    if (filtredMovies.length !== 0) {
      getFilteredMovies(isShortMovies, valueInputSearchMovies);
    }
  }, [isShortMovies])

  useEffect(() => {
    if (filtredSavedMovies.length !== 0) {
      getFilteredSavedMovies(isShortSavedMovies, valueInputSearchSavedMovies)
    }
  }, [isShortSavedMovies])

  // проверка логина 
  useEffect(() => {
    const tokenCheck = async () => {
      const jwt = token.get()
      if (jwt) {
        try {
          await getUser()
          await getSavedMovies()
          setIsLogin(true)
        } catch (err) {
          navigate("/")
          console.log(err)
        } finally {
          setIsLoadIn(false)
        }
      }
    };
    tokenCheck()
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
          filtredMovies={filtredMovies}
          movies={movies}
          isLoadingAddMovies={isLoadingAddMovies}
          valueInputSearchMovies={valueInputSearchMovies}
          setValueInputSearchMovies={setValueInputSearchMovies}
          isShortMovies={isShortMovies}
          setIsShortMovies={setIsShortMovies}
          isLoading={isLoading}
          getFilteredMovies={getFilteredMovies}
          saveOrRemoveMovie={saveOrRemoveMovie}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          addYetMovies={addYetMovies}
          isLoadIn={isLoadIn}
          isLogin={isLogin} />} />
        <Route path={paths.savedMovies} element={<ProtectedRoute
          component={SavedMovies}
          valueInputSearchSavedMovies={valueInputSearchSavedMovies}
          setValueInputSearchSavedMovies={setValueInputSearchSavedMovies}
          isShortSavedMovies={isShortSavedMovies}
          setIsShortSavedMovies={setIsShortSavedMovies}
          isLoading={isLoading}
          filtredSavedMovies={filtredSavedMovies}
          removeMovie={removeMovie}
          getFilteredSavedMovies={getFilteredSavedMovies}
          isLogin={isLogin}
          isLoadIn={isLoadIn} />} />
        <Route path={paths.profile} element={<ProtectedRoute component={Profile} isLoading={isLoading} isLogin={isLogin} updateUser={updateUser} signOut={signOut} />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <RoutesFooter />
      <NavBar isActive={burgerIsActive} toggleMenu={e => toggleBurger(e)} />
    </CurrentUserContext.Provider>
  );
}

export default App;
