import './App.css'
import { Card } from 'react-daisyui'
import { GiBackpack, GiPathDistance } from "react-icons/gi"
import { ImTree } from "react-icons/im";
import { MdScoreboard } from "react-icons/md";
import Mochila from './pages/Mochila.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Outlet, Link } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />,
      <Route path="/mochila" element={<Mochila />} />,
    </>
  ))

function App() {

  return (
    <>
    <RouterProvider router={router}/>
      <div>
        <header>
          <h1>Menu</h1>
          <p>Seleccione el algoritmo que desea implementar: </p>
        </header>
        <div className='flex flex-wrap gap-4 p-4'>
          <Link to="/mochila" >
          <Card side="lg" className='bg-slate-500 rounded-md hover:bg-slate-400' >
            <Card.Body>
              <GiBackpack size={50} className='ml-16'/>
              <Card.Title>Problema de la Mochila</Card.Title>
            </Card.Body>
          </Card>
          </Link>

          <Card side="lg" className='bg-slate-500 rounded-md hover:bg-slate-400' >
            <GiPathDistance size={50} className='ml-10'/>
            <Card.Body>
              <Card.Title>Rutas más cortas</Card.Title>
            </Card.Body>
          </Card>

          <Card side="lg" className='bg-slate-500 rounded-md hover:bg-slate-400' >
            <ImTree size={50} className='ml-10'/>
            <Card.Body>
              <Card.Title>Arboles Binarios</Card.Title>
            </Card.Body>
          </Card>

          <Card side="lg" className='bg-slate-500 rounded-md hover:bg-slate-400' >
            <MdScoreboard size={50} className='ml-10' />
            <Card.Body>
              <Card.Title>Series Deportivas</Card.Title>
            </Card.Body>
          </Card>

        </div>
      </div>
    </>
  )
}

export default App
