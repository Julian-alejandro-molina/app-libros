import Link from 'next/link'
import styles from './tuslibros.module.css';
import AuthContextProvider from '@/context/AuthContext';



export default function BibliotecaLayout({
  children, // will be a page or nested layout
}) {
  return (
    
      <AuthContextProvider>
    <section className={styles.contenedortuslibros}>
      <div className={styles.contenedorcontenido}>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className={styles.contenedorlink}>
        <li  className={styles.lituslibros}><Link href='/biblioteca/tusLibros' className={styles.lituslibros}>Tus libros</Link></li>
        <li  className={styles.lituslibros}><Link href='/biblioteca/favoritos' className={styles.lituslibros}>Favoritos </Link></li>
      </nav>
        <hr className={styles.hrlinea}></hr>
      
        
      {children}
    
    
      </div>
    </section>
    </AuthContextProvider>
  )
}