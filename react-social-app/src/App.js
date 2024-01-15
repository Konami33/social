
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import {Routes, Navigate} from 'react-router-dom';
import { 
  BrowserRouter as Router, 
  Route 
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Messenger from './pages/messenger/Messenger';
function App() {
  const {user} = useContext(AuthContext)
  return (
    <Router>
        <Routes>
          {/* <Route exact path='/' Component = {user?Home:Register}/> */}
          {/* <Route exact path='/' Component = {Home}/> */}
          {/* <Route exact path='/' Component={ user ? <Home/> : Register} />
          <Route exact path='/login' Component ={user? <Navigate to="/" /> : Login} />
          <Route exact path='/register' Component={user? Home : Register} />
          <Route exact path='/profile/:username' Component={Profile} /> */}
          <Route path='/' element={user ? <Home /> : <Register />} />
          <Route path='/login' element={user ? <Navigate replace to='/' /> : <Login />} />
          <Route path='/register' element={user ? <Navigate replace to='/' /> : <Register />} />
          <Route path='/messenger' element={!user ? <Navigate replace to='/' /> : <Messenger />} />
          <Route path='/profile/:username' element={<Profile />} />
        </Routes>
    </Router>
  );
}
export default App;
