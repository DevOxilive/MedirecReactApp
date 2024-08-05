import React from 'react'
import { useEffect, useState } from 'react'
import { NavBar } from '../Home/NavBar'
import { Button } from 'react-bootstrap'
import axios from 'axios'


export const HomeDoctorScreen = () => {
  
  const[user, setUser] = useState(null);
  const[nombre, setNombre] = useState("");

    const userData = JSON.parse(localStorage.getItem('user'));
    axios.get(`http://localhost:3001/user/doctor/${userData.id_usuario}`)
    .then((response) => {
      console.log(response.data[0]);
      setNombre(response.data[0].doc_nombre);
    })

  
  return (
    <>
      <NavBar/>
      <div class="p-5">

      <div>
        <h1>Bienvenido {nombre}</h1>
      </div>
      <Button class="ms-4" href="http://localhost:5173/prescription">
        Crear Receta
      </Button>
      </div>

    </>
  );
}
