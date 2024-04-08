import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './Components/Landing_page/Landing';
// import Login from './Components/Login/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        {/* <Route path='/login' element={<Login />} /> */}
      </Routes>
    </>
  );
}

export default App;
