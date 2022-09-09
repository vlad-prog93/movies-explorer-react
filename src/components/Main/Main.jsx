import Intro from './Intro/Intro';
import About from './About/About';
import Technology from './Technology/Technology';
import Person from './Person/Person';
import Portfolio from './Portfolio/Portfolio';

const Main = () => {
  return (
    <main className='main'>
      <Intro />
      <About />
      <Technology />
      <Person />
      <Portfolio />
    </main>
  )
}

export default Main;
