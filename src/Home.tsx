import { GiBackpack, GiPathDistance } from "react-icons/gi"
import { ImTree } from "react-icons/im";
import { MdScoreboard } from "react-icons/md";
import { Outlet, Link } from 'react-router-dom';
import './Home.css'

function Home() {
    return (
        <>
            <div>
                <div className='container'>
                    <header >
                        <h1>Menu</h1>
                        <p>Seleccione el algoritmo que desea implementar: </p>
                    </header>
                    <div className='flex flex-wrap gap-4 p-4 pl-28'>
                        <Link to='/mochila'>
                            <div className='grow' >
                                <GiBackpack size={50} className='icon' />
                                <p className='hiddentext'>Problema de la Mochila</p>
                            </div>
                        </Link>

                        <Link to='/rutas'>
                            <div className='grow' >
                                <GiPathDistance size={50} className='icon' />
                                <p className='hiddentext'>Rutas más cortas</p>
                            </div>
                        </Link>

                        <Link to='/arboles'>
                            <div className='grow' >
                                <ImTree size={50} className='icon' />
                                <p className='hiddentext'>Arboles Binarios</p>
                            </div>
                        </Link>

                        <Link to='/series'>
                            <div className='grow' >
                                <MdScoreboard size={50} className='icon' />
                                <p className='hiddentext'>Series Deportivas</p>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home