import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import { MainPage } from './components/main';
import ClubsPage from './components/clubs';
import NotFoundPage from './components/notfound';
import ClubPage from './components/club';

function App() {
  return (
    <div className="w-full">
      <NavBar></NavBar>

      <Routes>
        <Route path='/home' element={<MainPage></MainPage>}></Route>
        <Route path='/' element={<MainPage></MainPage>}></Route>
        <Route path='/clubs' element={<ClubsPage></ClubsPage>}></Route>
        <Route path='/clubs/:id' element={<ClubPage></ClubPage>}></Route>
        <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
