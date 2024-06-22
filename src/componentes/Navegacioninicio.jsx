import Link from "next/link";
export default function Navegacioninicio(){
return(
    <>
    <nav>
        <li><Link className='Link' href='/audiolibros'>Libroselectronicos</Link></li>
        <li><Link className='Link' href='/inicio/libroselectronicos'>audiolibros</Link></li>
    </nav>
    </>
);
}