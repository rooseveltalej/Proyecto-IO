import './App.css'
import Mochila from './pages/Mochila.jsx'
import Arboles from './pages/ArbolesBinarios.jsx'
import Rutas from './pages/Floyd.jsx'
import Series from './pages/SeriesDeportivas.jsx'
import Home from './Home.tsx'
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
