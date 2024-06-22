<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital@1&display=swap');
</style>
import '@/estilos/Navegacion.css';
import Link from 'next/link'
import { BsHouseHeartFill } from "react-icons/bs";
import { BsBook } from "react-icons/bs";
import { BsBookHalf } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
export default function Navegacion() {
    return (
        <div className="contenedor-navegacion">
            <ul className='lista-menu'>
                <div className='contenedor-list-item'>
                    <nav className='icono-navegacion'><Link href='/'><BsHouseHeartFill className='icono' /></Link>
                        <li className="item-inicio"><Link className='Link' href='/'>Inicio</Link></li>
                    </nav>

                    <nav className='icono-navegacion'><Link href='/biblioteca'><BsBook className='icono' /></Link>
                        <li className="item-biblioteca"><Link  className='Link' href='/biblioteca'>Biblioteca</Link></li>
                    </nav>

                    <nav className='icono-navegacion'><Link href='/lectura'><BsBookHalf className='icono' /></Link>
                        <li className="item-lectura"><Link  className='Link' href='/lectura'>Lectura</Link></li>
                    </nav>

                    <nav className='icono-navegacion'><Link href='/comprar'><BsCart3 className='icono' /></Link>
                        <li className="item-comprar"><Link  className='Link' href='/comprar'>Comprar</Link> </li>
                    </nav>





                </div>
            </ul>
            
        </div>
    );

}