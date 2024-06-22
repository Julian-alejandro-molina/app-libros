import axios from "axios";
import { useState, useEffect } from "react";
import { collection, addDoc, } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from '@/Firebase/Firebasedata';
import Tuslibros from "@/app/biblioteca/tusLibros/page";
import { librosMapper } from '../utils/mappers'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default function ApiConponent() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/subjects/science_fiction.json?limit=15')
        const libros = response.data.works;
        setData(librosMapper(libros));
      } catch (error) {
        console.log('¡Error al obtener datos de la Api!', error);
      }
    }
    fetchData();
  }, [])
  if (data?.length > 0) {
      return(
        data?.map(element=>{
          return(<div><div className='container-my-book-img' >{/*<img className='img-Carmybook' alt="" />*/}

            </div>
            <div className='container-bookinfo'>
              <h1 className='title-cardmybook'>{element.titulo}</h1>
              <h1 className='author-cardmybook'>{element.autor}</h1>
            </div>
            </div>
            
          )
        })
      )
  }
  
  return (
    <div>
      <h2>Información de la API:</h2>
      {data ? (<pre>{JSON.stringify(data, null, 2)}</pre>) : (<p>Cargando datos...</p>)}
      
     
       
    
      <h1></h1>
    </div>
  );
};