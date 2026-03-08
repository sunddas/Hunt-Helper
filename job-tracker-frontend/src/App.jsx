import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashbaord from "./pages/Dashboard"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Dashbaord/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
