import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './Components/Landing_page/Landing';
import Signup from './Components/Login/Signup';
import Login from './Components/Login/Login';
import Movies from './Components/Movies/Movies'; // Import Movies component
import MovieDetails from './Components/Movies/MovieDetails'; // Import MovieDetails component

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/movies' element={<Movies />} /> {/* New route */}
        <Route path='/movie/:movieId' element={<MovieDetails />} /> {/* Movie details route */}
      </Routes>
    </>
  );
}

export default App;
