import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import { MainPage } from './components/main';
import ClubsPage from './components/clubs';
import NotFoundPage from './components/notfound';
import ClubPage from './components/club';
import RegisterPage from './components/register';
import LoginPage from './components/login';
import { APIWrapper } from './services/api';

function App() {
  const Wrapper = new APIWrapper('http://localhost:3012')

  return (
    <div className="w-full">
      <NavBar Wrapper={Wrapper}></NavBar>

      <Routes>
        <Route path='/home' element={<MainPage></MainPage>}></Route>
        <Route path='/' element={<MainPage></MainPage>}></Route>
        <Route path='/clubs' element={<ClubsPage Wrapper={Wrapper}></ClubsPage>}></Route>
        <Route path='/clubs/:id' element={<ClubPage Wrapper={Wrapper}></ClubPage>}></Route>
        <Route path='/register' element={<RegisterPage Wrapper={Wrapper}></RegisterPage>}></Route>
        <Route path='/login' element={<LoginPage Wrapper={Wrapper}></LoginPage>}></Route>
        <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
