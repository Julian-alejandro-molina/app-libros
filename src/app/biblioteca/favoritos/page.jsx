'use client'
import '../favoritos/favoritos.css'
import { dataContext } from "@/context/DataContext";
import BibliotecaLayout from "../tusLibros/layout";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import app from '@/Firebase/Firebasedata';
import { v4 as uuidv4 } from 'uuid';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
const db = getFirestore(app);
export default function Favoritos() {
  const { favoritebooks, setFavoriteBooks } = useContext(dataContext);
  const [data, setData] = useState();
  
  
  

  






  const vercarrusell = favoritebooks ? favoritebooks.map(element => <section className='section-carrusell' key={uuidv4()}><img className='container-my-book-img-carrusell' src={element.cover} ></img>
    <div className='container-bookinfo-carrusell'>
      <h1 className='title-cardmybook-carrusell'>{element.title}</h1>
      <div className='container-author-shopping'><h1 className='author-cardmybook-carrusell'>{element.author}</h1><CiShoppingCart className='shopping' /></div>


    </div></section>) : null;

  console.log('esta', favoritebooks);
  return (
    <>
      <BibliotecaLayout />
      <div className='containerFavorite'>
        {/* <div className='contenedor-libro-seleccionado'>ddss</div>*/}
        <div className='contenedor-carrusel'>
          {/*<IoIosArrowDropleftCircle className='left-icon' />*/}
          {vercarrusell}
          {/*<IoIosArrowDroprightCircle  className='righ-icon'/>*/}


        </div>
      </div>
    </>
  );
}