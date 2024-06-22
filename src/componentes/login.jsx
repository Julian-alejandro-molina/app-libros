'use client'
import react, { useContext } from "react";
import styles from '../estilos/login.css'
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect } from "react";
import { dataContext } from "@/context/DataContext";





export default function Login(params) {
    const { loginn, setLogin, vew, setVew } = useContext(dataContext)
    const [usernameEmail, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    /*------------------------------------------------------------------*/
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [usernamee, setUsernamee] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [register, setRegister] = useState([]);
    const [storageRecovery, setStorageRecovery] = useState([]);


    useEffect(() => {
        const storedRegister = localStorage.getItem('UserRegister');
        if (storedRegister) {
            let recoveriDataArray = JSON.parse(storedRegister);
            setStorageRecovery(recoveriDataArray);
        } else {
            console.log('No hay datos en el localStorage con la clave "UserRegister".');
        }
    }, [])
/*-------------------------------------Sincronización entre pestañas--------------------------- */
    useEffect((e) => {
      const   handleStorageChange=(e)=>{
        if (e.key==='UserRegister') {
            const updateData=JSON.parse(e.newValue);
            setStorageRecovery(updateData);
            setRegister(updateData);
        }
      }
        window.addEventListener( 'storege',handleStorageChange); 
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
 
    }, [])
/**------------------------------------------------------------------------------------------------ */
    const login = (usernameEmail, password) => {

        const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const result = regex.exec(usernameEmail)

        if (usernameEmail === '' || password === '') {
            setError('Los campos estan vacios');
            alert(error)
            return;
        }
        if (result) {
            console.log('Correo elctronico encontrado ', result[0]);
        } else {
            console.log('No se encontro el correo electronico');
            setError('Correo no valido ')
            alert(error)
        }
        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            alert(error)
            return;
        }


        if (storageRecovery.length > 0) {
            let newusername = storageRecovery.some(element => element.email === usernameEmail);
            let newpassword = storageRecovery.some(element => element.contraseña === password);

            if (newusername === true && newpassword === true) {
                console.log('inicio de secion correcto');
                setLogin(usernameEmail)
                setVew(!vew)


            } else {
                alert('Contraseña o usuario incorrecta')
            }
        }

    }//puedo enviar los argumentos por que estan dentro de un evento 
    const handeltclick = (e) => {
        e.preventDefault()
        login(usernameEmail, password);
    }
    //console.log('este',vew);
    /*---------GUARDAMOS LOS DATOS DEL REGISTRO EN LOCAL STORAGE --------*/
    useEffect(() => {
        if (register) {
            console.log('original', register);
        }
    }, [register]);


    const submitdatos = (email, contraseña) => {

        const data = {
            firstname: firstname,
            lastname: lastname,
            usernamee: usernamee,
            email: email,
            contraseña: contraseña,
        }
        const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const result = regex.exec(email)

        if (email === '') {
            setError('Los campos estan vacios');
            alert(error)
            return;
        }
        if (result) {
            console.log('Correo elctronico encontrado ', result[0]);
        } else {
            console.log('No se encontro el correo electronico');
            setError('Correo no valido ')
            alert(error)
        }
        if (contraseña.length < 8) {
            setError('la contraseña debe tener almenos 8 caracteres')
            alert(error)
            return

        }
        if (register.length > 0) {
            const emailExists = register.some(element => element.email === email);// some() es un método de array que verifica si al menos un elemento en el array cumple con la condición proporcionada. Devuelve true si se encuentra un elemento que cumple con la condición y false en caso contrario.
            if (emailExists) {
                setError('Este correo electronico ya esta registrado')
                alert(error)
            } else {

                setRegister(e => [...e, data])//  Esta es una función que toma el estado anterior como argumento (e) y devuelve un nuevo array que contiene todos los elementos del array anterior (e) más un nuevo elemento (newData).
            }
        } else {
            setRegister(e => [...e, data])
        }

        setFirstname('');
        setLastname('');
        setUsernamee('');
        setEmail('');
        setContraseña('');
    }

    register.length > 0 && localStorage.setItem('UserRegister', JSON.stringify(register));

    // De esta menera tambien podemos ejecutar varias funcioens con un solo evento 
    const Handeltclick = (e) => {
        e.preventDefault();
        submitdatos(email, contraseña)

    }

    const showregister = show ? <div className="container-registro">
        <form action="" className="form">
            <IoIosCloseCircleOutline className="close-icon-registro" onClick={() => { setShow(!show) }} />
            <label htmlFor="" className="label">Primer nombre</label>
            <input type="text" className="input-form" id='name' value={firstname} required onChange={(e) => { setFirstname(e.target.value) }} />
            <label htmlFor="" className="label">Segundo nombre</label>
            <input type="text" className="input-form" id="lastname" value={lastname} required onChange={(e) => { setLastname(e.target.value) }} />
            <label htmlFor="" className="label">Nombre de usuario</label>
            <input type="text" className="input-form" id="usernamee" value={usernamee} required onChange={(e) => { setUsernamee(e.target.value) }} />
            <label htmlFor="" className="label">Email</label>
            <input type="text" className="input-form" id="Email" value={email} required onChange={(e) => { setEmail(e.target.value) }} />
            <label htmlFor="" className="label">Contraseña </label>
            <input type="text" className="input-form" id="contraseña" value={contraseña} onChange={(e) => { setContraseña(e.target.value) }} />
            <button className="btn" id="btn-registro" type="submit" onClick={Handeltclick} >Registrar</button>

        </form>
    </div> : '';


    return (

        <>
            <div className="container-login">
                <IoIosCloseCircleOutline className="close-icon" onClick={() => { setVew(!vew) }} />
                <FaUser className="login-icon" />
                <h2 className="text-login">Login</h2>
                <form >
                    <div className="form-group">
                        <label className="label-username" htmlFor="username">Usuario</label>
                        <input
                            className="input-username"
                            type="text"
                            id="username"
                            value={usernameEmail}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label-password" htmlFor="password">Contraseña</label>
                        <input
                            className="input-password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button className="btn" type="submit" onClick={handeltclick}>Iniciar sesión</button>
                </form>
                <h1 className="registrar" onClick={() => { setShow(!show) }}> Registrate</h1>


            </div>
            {showregister}

        </>

    );
};

