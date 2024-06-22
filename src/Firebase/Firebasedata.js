import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore/lite';


export const firebaseConfig = {
    apiKey: "AIzaSyB02rEUrRqSsnpWf1X2v0EkU37sys3m7kQ",
    authDomain: "app-libros-51b8d.firebaseapp.com",
    projectId: "app-libros-51b8d",
    storageBucket: "app-libros-51b8d.appspot.com",
    messagingSenderId: "983677049217",
    appId: "1:983677049217:web:e46cc6e8ad96bd3c1ab080"
};
//2
//Obtenemos los datos de la base de datos 
const app = initializeApp(firebaseConfig);
const querydb = getFirestore(app)
  export async function getbook (){
    const booksCol = collection(querydb, 'bookList');
    const bookSnapshot = await getDocs(booksCol);
    const bookList = bookSnapshot.docs.map(doc => doc.data());    
    return bookList
}

export default app;

