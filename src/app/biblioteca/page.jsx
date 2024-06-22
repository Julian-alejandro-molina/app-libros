'use client'
import { AuthContext } from '@/context/AuthContext';
import styles from '../biblioteca/page.module.css'
import BibliotecaLayout from '../biblioteca/tusLibros/layout'
import InformationBook from '@/componentes/informationbook';
import { DataContextProvider, dataContext } from '@/context/DataContext';
import Cardbook from '@/componentes/Cardbook';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useEffect } from 'react';

//4
//Usamos el contexto (AuthContext) para recibir la información y posteriormente 
//enviarla a el componente Cardbook, este se renderizara como un array de componentes 

export default function bliotecapage() {
  const { userbook, setUserbook } = useContext(AuthContext);

  let userbookCopy = [...userbook]
  let filtro = [];
  let lookforTitle=[]
  useEffect(() => {//Cuando cambias el estado o el contexto en React (como tu lista de libros userbook), 
    //ese cambio no se aplica de manera inmediata. React planifica estos cambios y los aplica en el próximo ciclo de renderizado. 
    //Esto significa que si cambias el estado y luego inmediatamente tratas de acceder a ese estado,
    //es posible que veas el valor antiguo, no el actualizado, para eveitar este comportamietno utilizamos useEffect cada que  userbook cambie 
    // para garantizar que los cambios se realizen 
    setFilteredBooks([...userbook]);
  }, [userbook]);

  const [view, setView] = useState(false);
  const [viewLis, setViewLis] = useState(false);
  const [getTexAuthor, setTexAuthor] = useState();
  const [getTexGender, setTexGender] = useState();
  const [lookfor, setLookfor] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(userbookCopy);
  //console.log('este',filteredBooks);


  //-------FUN. PARA VER EL COMPONENTE--------------/ 
  const ReceiveMessage = (message) => {
    const newparameter = message
    if (newparameter === true) {
      setView(true);
    }

  }
  ReceiveMessage();
  //console.log('estes',verData);
  //-------FUN. PARA OCULTAR EL COMPONENTE--------------
  const OCULTAR = (messageocultar) => {
    const newparameterr = messageocultar
    if (newparameterr === true);
    setView(false);
  }

  const verlist = () => {
    setViewLis(!viewLis)
  }
  //--------CAPTURAR DATOS DEL TEXAREA---------
  const getFilterauthor = (event) => {
    const value = event.target.value;
    setTexAuthor(value);  // Actualiza el estado con el valor actual del input
  }
  const getFiltergender = (event) => {
    const value = event.target.value;
    setTexGender(value);

  }
  /*------------------BUSCADOR--------------------*/
  const seeker = (event) => {
    const value = event.target.value;
    setLookfor(value);
    if (value.trim() === '') {
      setFilteredBooks(userbookCopy);
    } else {
       lookforTitle = filteredBooks.filter(element =>
        element.title.toLowerCase().includes(value.toLowerCase())
      );
    }
    if (lookforTitle.length > 0) {
      setFilteredBooks(lookforTitle)
    } else {
      setFilteredBooks(userbookCopy);
    }

  }
  //-------------------------------------------
  //----------------------------------------------------
  const viewrcomponent = view ? <InformationBook mensajecultar={OCULTAR} /> : '';
  const viewLisGenero = viewLis ? <div className={styles.conternerfilterlist}>
    <li className={styles.filterlis}>Autor</li>
    <textarea className={styles.Textarea} name="" value={getTexAuthor} onChange={getFilterauthor} cols="30" rows="10"></textarea>
    <li className={styles.filterlis}>Genero</li>
    <textarea className={styles.Textarea} name="" value={getTexGender} onChange={getFiltergender} cols="30" rows="10"></textarea>
  </div> : '';
  let UserbookGender = []
  let UserbookAuthor = []
  if (Array.isArray(userbookCopy)) {
    UserbookGender = filteredBooks.filter(element => element.genre.toLowerCase() === getTexGender);
    UserbookAuthor = filteredBooks.filter(element => element.author.toLowerCase() === getTexAuthor)

  }

  //console.log(UserbookAuthor);

  if (UserbookGender.length > 0) {
    filtro = UserbookGender
  } else if (UserbookAuthor.length > 0) {
    filtro = UserbookAuthor

  } else {
    filtro = filteredBooks;
  }


  const manageBooks = (element) => {
    if (element.length > 0) {
      //console.log("HOLA MUNDO!")
      return (

        element.map((elementbook) => {
          return (<Cardbook
            key={uuidv4()}
            author={elementbook.author}
            cover={elementbook.cover}
            genre={elementbook.genre}
            id={elementbook.id}
            otherBooks={elementbook.otherBooks}
            pages={elementbook.pages}
            synopsis={elementbook.synopsis}
            title={elementbook.title}
            year={elementbook.year}
            index={{ userbook }}
            read={elementbook.read}
            ReceiveMessage={ReceiveMessage}

          />

          );
        })


      )
    }
  }
  return (
    <>
      <div className={styles.contenedorbiblioteca}>
        <DataContextProvider>
        <BibliotecaLayout />
        </DataContextProvider>
        <DataContextProvider >
          <input className='buscador' placeholder='Buscar en libros' value={lookfor} onChange={seeker}></input>
          <button className='buscador-boton'>Buscar</button>
          <BsSearch className='buscador-lupa' />
          <div className={styles.containerF}>
            <div className={styles.Containerfilter}>Filtro<FaFilter className={styles.Filter} onClick={verlist} /></div>
          </div>
          {viewLisGenero}

          <nav className={styles.containerbooklibraryendInfo}>

            <section className={styles.containerbooklibrary}>{manageBooks(filtro)}</section>
            {viewrcomponent}
          </nav>
        </DataContextProvider>

      </div>
    </>
  );
}