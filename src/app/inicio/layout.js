import Link from 'next/link'
import styles from './libroselectronicos/layout.module.css'
import AuthContextProvider from '@/context/AuthContext'

export default function InicioLayout({
  children, // will be a page or nested layout
}) {
  return (
    
    <section className={styles.sectionlayout}>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className={styles.contenedorlayouinicio}>
        
        
        <li ><Link href='/inicio/libroselectronicos' className={styles.Listamenuinicio}>Libros electronicos</Link></li>
        
      
        <li ><Link href='/inicio/audiolibros' className={styles.Listamenuinicio}>Audio libros</Link></li>
        
      </nav>
       {/*<hr className={styles.hrLinea}></hr> */} 
     <AuthContextProvider>
      {children}
      </AuthContextProvider> 
    </section>
  
   
   

  )
}
