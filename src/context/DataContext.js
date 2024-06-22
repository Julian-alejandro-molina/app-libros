"use client"
import { useContext, useEffect, useState } from "react";
import { createContext,  } from "react";
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore";
import app from '@/Firebase/Firebasedata';

//--------------------------------------------------
export const dataContext = createContext();
const db = getFirestore(app);

export const DataContextProvider = ({ children }) => {
  const [infoData, setInfoData] = useState(/*data*/);
  const [verData, setverData] = useState(/*data.valor*/);
  const [infoyourBooks, setInfoyourBooks] = useState();
  const [favoritebooks, setFavoriteBooks]=useState();
  const [loginn,setLogin]=useState();
  const [vew, setVew]=useState(true);
  const [id, setID] = useState();
  
  const datos = { 
    infoData, setInfoData, 
    verData, setverData, 
    infoyourBooks, setInfoyourBooks, 
    id, setID,
    favoritebooks, setFavoriteBooks,
    loginn,setLogin,
    vew, setVew,
    }
  //--------------------------------------------------------------
  
    useEffect(() => {
      async function Getdoc() {
        try {
          const Mycollection = await getDocs(collection(db, 'FavoriteBook',));
          const booksData = Mycollection.docs.map((doc) => doc.data());
           
          //----verificamos que la lista no esta vacia---
          if (booksData.length === 0) {
            alert('lista de vacia ')
          }
          setFavoriteBooks(booksData)//utilizamos el contexto con los valores de la coleccion 
          console.log('Documents obtained correctly');
        } catch (error) {
          console.log('Error obtaining documents', error);
        }
      }
      Getdoc();
  
    }, [setFavoriteBooks,])
    
   
      /*useEffect(() => {
        // Verificamos si el valor anterior de bookDataCopy es diferente del nuevo valor
        if (JSON.stringify(bookDataCopy) !== JSON.stringify(favoritebooks)) {
          setFavoriteBooks(bookDataCopy);
        }
      }, [bookDataCopy, favoritebooks]);*/
  
   
    //----------------------------------------------------------------------
  return (
    <dataContext.Provider value={datos}>
      {children}
    </dataContext.Provider>
  );
}