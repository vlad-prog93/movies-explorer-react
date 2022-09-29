import { BrowserRouter, Route, Routes, useRoutes } from "react-router-dom";
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

// прочее
import {paths} from "../../utils/constants";


function App() {
  const [burgerIsActive, setBurgerIsActive] = useState(false);

  const toggleBurger = (e) => {
    setBurgerIsActive(!burgerIsActive)
  }

  const RoutesHeader = () => useRoutes(
    [paths.home, paths.movies, paths.savedMovies, paths.profile].map((path, ind) => {
      return { path: path, element: <Header burgerIsActive={burgerIsActive} toggleBurger={toggleBurger} />  }
    }
    ))

  const RoutesFooter = () => useRoutes(
    [paths.home, paths.movies, paths.savedMovies].map((path, ind) => {
      return { path: path, element: <Footer /> }
    }
    ))

  return (
    <BrowserRouter>
      <RoutesHeader />
      <Routes>
        <Route path={paths.home} element={<Main burgerIsActive={burgerIsActive} toggleBurger={toggleBurger} />} />
        <Route path={paths.signUp} element={<Register />} />
        <Route path={paths.signIn} element={<Login />} />
        <Route path={paths.movies} element={<Movies burgerIsActive={burgerIsActive} toggleBurger={toggleBurger} />} />
        <Route path={paths.savedMovies} element={<SavedMovies burgerIsActive={burgerIsActive} toggleBurger={toggleBurger} />} />
        <Route path={paths.profile} element={<Profile />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <NavBar isActive={burgerIsActive} toggleMenu={e => toggleBurger(e)} />
      <RoutesFooter />
    </BrowserRouter>
  );
}

export default App;
