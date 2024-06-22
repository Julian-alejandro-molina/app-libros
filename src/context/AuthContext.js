'use client'
import { getbook } from '@/Firebase/Firebasedata';
import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();


//3
//importamos la funcion getbook que contiene la informacion  de la base de datos 
// con esta informacion creamos el contexto 

const AuthContextProvider = ({ children }) => {

    //const[userbook,setUserbook]=useState(getbook() );
    const [userbook, setUserbook] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        //console.log("Test")
        setLoading(true);
        const dbInfo = await getbook();
        setUserbook(dbInfo)
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])



    /*  useEffect(()=> {
         (async () => {
             const dbInfo = await getbook();
             setUserbook(dbInfo)
         })();
       },[]) */



    const data = { loading, userbook, setUserbook }
    return (
        <AuthContext.Provider value={data} >
            {children}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;