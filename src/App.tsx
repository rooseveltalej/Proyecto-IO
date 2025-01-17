import './App.css'
import Mochila from './pages/Mochila.jsx'
import Home from './Home.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import ArbolesBinarios from './pages/ArbolesBinarios.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />,
      <Route index element={<Home />} />,
      <Route path="/mochila" element={<Mochila />} />,
      <Route path="/ArbolesBinarios" element={ArbolesBinarios />} />
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
