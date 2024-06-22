//6
//Traemos nuevamente la información de la colección  mybook par plasmarla en el componente tus libros, 
//que albergara un arry de componentes que del componente caydmybook
'use client'
import Cardmybook from '@/componentes/CardmyBook';

import styles from './tuslibros.module.css'
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsBarChartSteps } from "react-icons/bs";
import { useContext, useEffect } from 'react';
import { dataContext } from '@/context/DataContext';
import { getFirestore } from 'firebase/firestore';
import app from '@/Firebase/Firebasedata';
import { collection, query, where, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link'


const db = getFirestore(app);



export default function Tuslibros() {
  const { infoyourBooks, setInfoyourBooks, id, favoritebooks } = useContext(dataContext);

  /*if (infoyourBooks && infoyourBooks.length === 0) {
   alert('la lista esta vacia ')
  }*/
  const mostrar = infoyourBooks && infoyourBooks.length === 0 ? <div className={styles.containernobooks}>
    {/*<img className={styles.ilbraryimg} src='' alt="" width="200" height="200" />*/}
    <p className={styles.parrafo}>la lista de tus libros esta vacia puedes ir abiblioteca para agregar una </p>
    <button className={styles.regresarabiblioteca}><li className="item-biblioteca"><Link className={styles.Link} href='/biblioteca'>Ir a biblioteca</Link></li></button>
  </div> : '';



  /*--------------------RENDERIZAMOS EL COMPONENTE----------------------*/

  const handleData = (datos) => {
    const cardcomponets = []
    datos?.forEach(element => {
      cardcomponets.push(<Cardmybook
        key={uuidv4()}
        title={element.title}
        cover={element.cover}
        author={element.author}
        id={element.id}
        read={element.read}

      />);
    })

    return cardcomponets;

  };


  /*-----------OBTENER DOCUMENTOS DE LA COLECCION*/
  useEffect(() => {
    async function Getdoc() {
      try {
        const Mycollection = await getDocs(collection(db, 'MyBook',));
        const booksData = Mycollection.docs.map((doc) => doc.data());
        setInfoyourBooks(booksData)//utilizamos el contexto con los valores de la coleccion 
        console.log('Documents obtained correctly');
      } catch (error) {
        console.log('Error obtaining documents', error);
      }
    }
    Getdoc();
  }, [setInfoyourBooks, id])








  //console.log('array', favoritebooks);


  return (
    <>
      <nav className={styles.contenedorfiltros}>
        <button className={styles.autor}><BsBarChartSteps />Autor<BsFillCaretDownFill /></button>
        <button className={styles.generos}>Generos<BsFillCaretDownFill /></button>
        <button className={styles.titulo}>Titlo<BsFillCaretDownFill /></button>

      </nav>
      <section className={styles.containerforyourbooks}>
        <div className={styles.slider}>
          {mostrar}
          {handleData(infoyourBooks)/*Se ejecuta la funcion pasando el contexto 
                                    que se recibe como parametro datos*/}

        </div>

      </section>
    </>
  );
}

