import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/pages/Authentication/Signin'
import Register from './components/pages/Authentication/Register'

function App() {

  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
