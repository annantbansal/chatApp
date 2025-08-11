import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import {Toaster} from 'react-hot-toast';
import { AuthContext } from './context/AuthContext.jsx';
const App = () => {
  const {authUser}=useContext(AuthContext);
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster></Toaster>
      <Routes>
        <Route path='/' element={authUser?<HomePage></HomePage>:<Navigate to={'/login'}></Navigate>}></Route>
        <Route path='/login' element={!authUser?<LoginPage></LoginPage>:<Navigate to={'/'}></Navigate>}></Route>
        <Route path='/profile' element={authUser?<ProfilePage></ProfilePage>:<Navigate to={'/login'}></Navigate>}></Route>
      </Routes>
    </div>
  )
}

export default App;
