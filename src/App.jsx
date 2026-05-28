import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Register from './pages/Register'
import Journey from './pages/Journey'
import Events from './pages/Events'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/journey" element={<Journey />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  )
}
