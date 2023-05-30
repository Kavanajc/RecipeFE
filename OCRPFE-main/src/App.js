import logo from './logo.svg';
import './App.css';
import { Veg } from './Veg';
import { NonVeg } from './Non-Veg';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import RegisterAdmin from './RegisterAdmin';
import Appheader from './Appheader';
import Recipes from './Recipes';
import MyProfile from './MyProfile';
import AdminPage from './AdminPage';
import State from './State';
import User from './User';
import Search from './Search';
import CommentSection from './CommentSection';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './ReactToastify.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
      <Appheader></Appheader>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/Register' element={<Register/>}></Route>
      <Route path='/RegisterAdmin' element={<RegisterAdmin/>}></Route>
      <Route path='/Recipes' element={<Recipes/>}></Route>
      <Route path='/Veg' element={<Veg/>}></Route>
      <Route path='/Non-Veg' element={<NonVeg/>}></Route>
      <Route path='/MyProfile' element={<MyProfile/>}></Route>
      <Route path='/AdminPage' element={<AdminPage/>}></Route>
      <Route path='/State' element={<State/>}></Route>
      <Route path='/Search' element={<Search/>}></Route>
      <Route path='/User' element={<User/>}></Route>
      <Route path='/CommentSection' element={<CommentSection/>}></Route>
   
    
    
    </Routes>
    <ToastContainer
    position="top-cente"
    autoClose={10}
    hideProgressBar = {false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    />

    </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
