'use client'
import InicioLayout from './inicio/layout'
import styles from './home.module.css'
import '../Firebase/credentials';
import Link from 'next/link';
import Login from '@/componentes/login';
import { FaUserCircle } from "react-icons/fa";
import { useContext } from 'react';
import { dataContext } from '@/context/DataContext';
import { BsCaretDownFill } from "react-icons/bs";


export default function Home() {
  const {loginn,vew,setVew}=useContext(dataContext);
  
  const verlogin=()=>{
    setVew(!vew);
  }
  const mostrar=vew? '':<Login/>;
  return (
    


    <div className={styles.contenedorHome}>
      
     <InicioLayout/>
     
    <div className={styles.containeruser}><FaUserCircle className={styles.usericon}/><h1 className={styles.hello}>Hola,{loginn}<BsCaretDownFill className={styles.desplegrar} onClick={verlogin}/> </h1></div>
    <section className={styles.bienvenida}> 
      <h1 className={styles.title}>¿Todo listo para leer?</h1>
      <p className={styles.p}>comienza a leer un libro de tu biblioteca</p>
      <Link href='/biblioteca'><button className={styles.button}> Ir a biblioteca</button></Link>

      {mostrar}
    </section>
    
    
   
     
      
    </div>

    
    
    
   
  )
}

