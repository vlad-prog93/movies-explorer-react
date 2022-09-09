import Promo from './Promo/Promo';
import About from './About/About';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

const Main = () => {
  return (
    <main className='main'>
      <Promo />
      <About />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  )
}

export default Main;
