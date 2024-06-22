//5
//Creamos una nueva colección que almacenara los libros que el usuario leccióno para leer 

'use client'
import '../estilos/InformationBook.css'
import { useContext, useEffect, useState } from 'react';
import { dataContext } from '@/context/DataContext';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoBook } from "react-icons/io5";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from '@/Firebase/Firebasedata';
import { doc, setDoc,getDocs } from "firebase/firestore";
import { collection, addDoc, } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export default function InformationBook({ mensajecultar }) {
  const { infoData, setInfoData, setverData, verData, infoyourBooks, setInfoyourBooks, id,setID } = useContext(dataContext);
  const [mybook, setMybook] = useState();

  /*--------GUARDAD DATOS EN UNA NUEVA COLECCION*/
  const guardarDatos = async () => {

    let  bookData=[]
    const querySnapshot = await getDocs(collection(db, 'MyBook'));
    //verificamos si la lista esta vacia 
    querySnapshot?.forEach(element => {
       bookData.push(element.data());
      });
      if (bookData.length===0 || bookData.length<1 ) {
          console.log('nueva lista de libros creada en "Tus Libros" ');
      }
    

      // Verificar si el libro ya está presente en la lista
    const libroExistente = bookData.find(libro => libro.title === infoData.title);
    if (libroExistente) {
        alert('Este libro ya está en la lista');
        return; // Salir de la función si el libro ya existe
    }

    // Agregar el libro solo si no existe en la lista
    //console.log(infoData.title);
    //console.log('[]', bookData);
      
    const idoc=uuidv4()
    try {
      // Usa await solo dentro de una función async
      /* Para que el nuevo documento se pueda agregar el valor del ID debe de ser impar, 
      o en su defecto no tenerlo para que el método (addDoc) lo pueda generar automáticamente*/
      const docRef = await addDoc(collection(db, 'MyBook'), {
        
        title: infoData.title,
        author: infoData.author,
        synopsis: infoData.synopsis,
        cover:infoData.cover,
        id:idoc,
        read:infoData.read
        

      });
      alert("¡Se agrego el libro a la lista de lectura(tus libros ) !");
      
      console.log('Nuevo documento agregado con ID: ',docRef.id);

      setInfoData(prevInfoData => ({
        // Tomamos el valor más reciente del objeto que en este caso es el infodata y lo pasamos como parámetro
        // en prevInfoData para realizar una copia y luego actualizar el objeto dentro del estado que actualiza el 
        // contexto, de esta manera garantizamos la inmutabilidad del objeto
        ...prevInfoData,
        id: idoc
      }));
      
    } catch (Error) {
      console.log('Error al  agregar  con ID: ', docRef.id);
    }

  };


  /*Para poder imprimir el valor actulizdo */
  useEffect(() => {
    console.log('este uno contexto', infoData);
     setID('julian');
    // Cada que la dependencia, que en este cado es [infodata] Cambie, se ejecutara 
    //el efecto secundario que es el console.log(infoData);
  }, [infoData])


  // --visualizar el componente informatibook mediante el  contexto---
  var l;
  useEffect(() => {
    if (verData === false) {
      l = true
      setverData(l)
    } else {
    }
  }, [])

  const close = () => {
    mensajecultar(verData)

  }
  //--FUSIÓN OBTENER EL LIBRO MEDIANTE EL CONTEXTO-- 


  const getBook = async () => {
    await guardarDatos()
    
  }
  console.log('este yourbook', id);





  return (

    <div className="container-information-book">
      <IoMdCloseCircleOutline className='close' onClick={close} />
      <div className='container-information-book-img'><img className='img-cardinfo' src={infoData.cover}></img></div>
      <h1 className='title-info-book'>{infoData.title}</h1>
      <h1 className='author-info-book'>{infoData.author}</h1>
      <p className='synopsis-book'>{infoData.synopsis}</p>

      <button className='get-book' onClick={getBook}>Obtener libro <IoBook className='bookicon' /></button>

    </div>

  );
}
