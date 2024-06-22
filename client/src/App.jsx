import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './components/pages/Authentication/Signin'
import Register from './components/pages/Authentication/Register'
import { useContext } from 'react'
import { AuthContext } from './AuthContext/AuthContext'
import Home from './components/pages/Home/Home'

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path='/' element={isAuthenticated?<Home/>:<Navigate to="/sign-in" />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
