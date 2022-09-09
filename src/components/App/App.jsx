import { Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute';

import './App.css';


const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/*' element={<ProtectedRoute isLogin={true} component={Main} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
