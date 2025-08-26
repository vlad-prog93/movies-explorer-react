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
import { paths, SHORT_MOVIE_DURATION } from "../../utils/constants"
import auth from '../../utils/auth'
import { useEffect } from "react"
import { token, moviesLC, isShortLC, valueInputLC } from '../../utils/local'
import mainApi from "../../utils/mainApi"
import moviesApi from "../../utils/moviesApi"
import { URL_MOVIES } from "../../utils/constants"


// контексты
import CurrentUserContext from "../../contexts/currentUserContext"

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
  const [filtredMovies, setFiltredMovies] = useState(JSON.parse(moviesLC.get()) || [])

  // сохраненные фильмы, отфильтрованные-отрисованные фильмы
  const [savedMovies, setSavedMovies] = useState([])
  const [filtredSavedMovies, setFiltredSavedMovies] = useState([])

  // значения формы поиска для фильмов - значение инпута, значение чекбокса
  const [valueInputSearchMovies, setValueInputSearchMovies] = useState(valueInputLC.get() || "")
  const [isShortMovies, setIsShortMovies] = useState(Boolean(isShortLC.get()) || false)

  // значения формы поиска для сохраненных фильмов - значение инпута, значение чекбокса
  const [valueInputSearchSavedMovies, setValueInputSearchSavedMovies] = useState("")
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false)

  // хук - отвечает за отрисовку отфильтрованных фильмов и обработку кнопки "еще"
  const [renderMovies, addYetMovies, isLoadingAddMovies] = useAddMovies(filtredMovies)

  const toggleBurger = (e) => setBurgerIsActive(!burgerIsActive)


  // на случай если пользователь не авторизован оказался
  const redirect = () => {
    token.remove()
    setIsLogin(false)
    setCurrentUser({})
    token.remove()
    isShortLC.remove()
    valueInputLC.remove()
    moviesLC.remove()
    setIsShortMovies(false)
    setValueInputSearchMovies("")
    setFiltredMovies([])
    setSavedMovies([])
    setIsShortSavedMovies(false)
    setValueInputSearchSavedMovies("")
    setFiltredSavedMovies([])
    navigate("/")
  }

  // обработчик ошибок
  const handleErrors = (e) => {
    if (e.status === 401) {
      redirect()
    } else {
      console.log(e)
      return e
    }
  }

  // действия связанные с фильмами
  const getSavedMovies = async () => {
    try {
      const { movies } = await mainApi.getMovies()
      setSavedMovies(movies)
      getFilteredSavedMovies(isShortSavedMovies, valueInputSearchSavedMovies)
    } catch (e) {
      handleErrors(e)
    }
  }

  const getFilteredMovies = async (shortMovies, valueSearch) => {
    try {
      setIsLoading(true)
      const movies = await moviesApi.get()
      const filtredOnShortMovies = shortMovies ? movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION) : movies
      const filtredOnTextAndShortMovies = filtredOnShortMovies.filter((movie) => movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase()))
      setIsShortMovies(shortMovies)
      moviesLC.set(JSON.stringify(filtredOnTextAndShortMovies))
      isShortLC.set(shortMovies)
      valueInputLC.set(valueSearch)
      setFiltredMovies(filtredOnTextAndShortMovies)
    } catch (e) {
      handleErrors(e)
    } finally {
      setIsLoading(false)
    }
  }

  const getFilteredSavedMovies = (shortMovies, valueSearch) => {
    const filtredOnShortSavedMovies = shortMovies ? savedMovies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION) : savedMovies
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
      handleErrors(e)
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
      setFiltredSavedMovies([...savedMovies, movie])
    } catch (e) {
      handleErrors(e)
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
      handleErrors(e)
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
      handleErrors(e)
    }
  }

  const signOut = (e) => {
    e.preventDefault()
    redirect()
  }

  const getUser = async () => {
    try {
      const user = await mainApi.getUser()
      setCurrentUser({ id: user._id, name: user.name, email: user.email })
    } catch (e) {
      handleErrors(e)
    }
  }

  const updateUser = async (name, email) => {
    try {
      setIsLoading(true)
      const res = await mainApi.updateUser(name, email)
      setCurrentUser({ ...currentUser, name: res.name, email: res.email })
      return res
    } catch (e) {
      handleErrors(e)
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
      getFilteredMovies(isShortMovies, valueInputSearchMovies);
  }, [isShortMovies])

  useEffect(() => {
    if (savedMovies.length !== 0) {
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
          <Route path={paths.signUp} element={<Register isLogin={isLogin} authError={authError} signUp={signUp} />} />
          <Route path={paths.signIn} element={<Login isLogin={isLogin} authError={authError} signIn={signIn} />} />
          <Route path={paths.movies} element={<ProtectedRoute
            component={Movies}
            renderMovies={renderMovies}
            filtredMovies={filtredMovies}
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
          <Route path={paths.profile} element={<ProtectedRoute
            component={Profile}
            isLoadIn={isLoadIn}
            isLoading={isLoading}
            isLogin={isLogin}
            updateUser={updateUser}
            signOut={signOut} />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <RoutesFooter />

        <NavBar isActive={burgerIsActive} toggleMenu={e => toggleBurger(e)} />
      </CurrentUserContext.Provider>
  );
}

export default App;
