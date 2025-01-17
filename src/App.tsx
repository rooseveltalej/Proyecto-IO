import './App.css'
import Mochila from './pages/Mochila.js'
import Arboles from './pages/ArbolesBinarios.js'
import Rutas from './pages/Floyd.js'
import Series from './pages/SeriesDeportivas.js'
import Home from './Home.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />,
      <Route index element={<Home />} />,
      <Route path="/mochila" element={<Mochila />} />,
      <Route path="/rutas" element={<Rutas />} />,
      <Route path="/arboles" element={<Arboles />} />,
      <Route path="/series" element={<Series />} />,
    </>
  ))

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
