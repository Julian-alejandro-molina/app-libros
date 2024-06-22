import '@/estilos/CardmyBook.css'
import { useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from '@/Firebase/Firebasedata';
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { dataContext } from '@/context/DataContext';
import { AuthContext } from '@/context/AuthContext';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineFavorite } from "react-icons/md";
import { addDoc } from "firebase/firestore";




const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let bookDataCopy = []


export default function Cardmybook({ title, author, cover, id, read, cardcomponets }) {
    const { infoyourBooks, setInfoyourBooks, favoritebooks, setFavoriteBooks } = useContext(dataContext) || {};
    const { userbook } = useContext(AuthContext) || {}
    const [readprologo, setReadprologo] = useState();
    const [bookDataCopy, setBookDataCopy] = useState();

    /*useEffect(() => {
        console.log('favoritebooks:', favoritebooks);
    }, [favoritebooks]);*/


    const [userdata, setuserdata] = useState(JSON.parse(localStorage.getItem('DatosBooks')));


    const selecteFavoritos = async () => {
        let bookData = []
        let posicion
        const querySnapshot = await getDocs(collection(db, 'FavoriteBook'));
        querySnapshot?.forEach(element => {
            bookData.push(element.data());
        });
        setBookDataCopy([...bookData])
        const libroExistente = bookData.find(libro => libro.title === title);
        if (libroExistente) {
            
            alert('Este libro ya está en la lista');
            return; // Salir de la función si el libro ya existe
        }
        if (bookData.length === 0 || bookData.length < 1) {
            console.log('nueva lista de libros creada en "Favoritos" ');
        }


        try {

            const docRef = await addDoc(collection(db, "FavoriteBook"), {
                title: title,
                author: author,
                cover: cover,
                read

            });
            console.log("Document written with ID: ", docRef.id);
            alert('Se agrego un libro a tu lista de favoritos')
        } catch (error) {
            console.error('Erro al algregar el documento!!!');

        }




    };





    /*--------obtenemos el texto del prologo y lo mostramos en un texarea*/
    const getread = () => {
        const readposition = infoyourBooks.findIndex((element) => element.read === read)
        console.log(readposition);
        const prologo = infoyourBooks[readposition]?.read;
        setReadprologo(prologo)


    }
    const chanGestateValue = () => {
        setReadprologo('');
    }
    const verprologo = readprologo ? <div className="container-prologo">
        <div className='closer-icon'><AiOutlineCloseCircle className='closer-stiles' onClick={chanGestateValue} /></div>

        <textarea className='container-text-prologo'>{readprologo}</textarea>
    </div> : '';



    const ChangeStatus = () => {
        setSeemenu(!seemenu);
    }
    const Deltedoc = async () => {
        let documentsobtained = [];
        let index;
        var IDdoc;
        var nuevoArray;
        //comparamos el id del contexto que traemos como props con el id del libro que esta en la base de datos, 
        //para de esta menera obtener el index
        for (let i = 0; i < infoyourBooks.length; i++) {
            index = infoyourBooks.findIndex((element) => element.id === id);
            nuevoArray = infoyourBooks.filter(objeto => objeto.id !== id);

            //console.log('po', index);

        }

        console.log(infoyourBooks);
        console.log(nuevoArray);
        setInfoyourBooks(nuevoArray)

        try {
            //obtenemos los id de los documentos 
            const querySnapshot = await getDocs(collection(db, 'MyBook'));
            querySnapshot.forEach((element) => {
                documentsobtained.push(element.id)
            })

            console.log('id de los documentos obtenidos correctamente', documentsobtained);
        } catch (error) {
            console.log('!Error al obnetener documentos!', error);

        }
        try {

            IDdoc = documentsobtained[index]

            await deleteDoc(doc(db, "MyBook", IDdoc));

            console.log('El documento se elimino de forma correcta',);
        } catch (error) {
            console.log('¡Erro al emiminar el documento con id!');
        }


        //await deleteDoc(doc(db, "MyBook", '5dd4677a-e446-4631-993e-a0d1c91b0d7d'));   
    }

    const [seemenu, setSeemenu] = useState(false);
    const showmenu = seemenu ? <ul className='dropdowm'>
        <li className='li-cardmybook' onClick={Deltedoc}>Quitar<MdOutlineDelete /></li>
        <li className='li-cardmybook' onClick={getread}>Leer <FaBookReader /></li>
    </ul> : '';
   

    return (
        <>
            <div >
                <div className='container-my-book-img' ><img className='img-Carmybook' src={cover} alt="" />
                    <CiMenuKebab className='menu-cardmybook' onClick={ChangeStatus} />
                    {showmenu}

                </div>
                <div className='container-bookinfo'>
                    <h1 className='title-cardmybook'>{title}</h1>
                    <h1 className='author-cardmybook'>{author}</h1>
                    <div className='container-favorite'><MdOutlineFavorite className='aicon-favorite' onClick={selecteFavoritos} /></div>
                </div>


                {verprologo}
            </div>
        </>
    );
}