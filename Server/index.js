import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import fs from 'fs';
import multer from 'multer';

import { getEstados } from './JavaScript/Users/getEstados.js';
import { getMunicipios } from './JavaScript/Users/getMunicipios.js';
import { getColonias } from './JavaScript/Users/getColonias.js';
import { registerUser } from './JavaScript/Users/registerUser.js';
import { loginUser } from './JavaScript/Access/loginLogic.js';
import { getProducts } from './JavaScript/Users/getProducts.js';
import { GetUsers } from './JavaScript/Admin/Users/GetUsers.js';
import { editUsers } from './JavaScript/Admin/Users/editUsers.js';
import { deleteUsers } from './JavaScript/Admin/Users/deleteUsers.js';
import { GetDoctors } from './JavaScript/Admin/Doctors/GetDoctors.js';


// Configuración de la conexión para Medirec
const dbMedirecConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // Ajusta esto si tienes una contraseña
    database: 'medirecactreact',
};

// Configuración de la conexión para Sepomex
const dbSepomexConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sepomex',
};

// Crear conexiones
const dbMedirec = mysql.createConnection(dbMedirecConfig);
const dbSepomex = mysql.createConnection(dbSepomexConfig);

// Conectar a las bases de datos
dbMedirec.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos Medirec:', err);
        return;
    }
    console.log('Conectado a la base de datos Medirec');
});

dbSepomex.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos Sepomex:', err);
        return;
    }
    console.log('Conectado a la base de datos Sepomex');
});

const app = express();
app.use(cors());
app.use(express.json());

// Configurar rutas
getEstados(app, dbSepomex);
getMunicipios(app, dbSepomex);
getColonias(app, dbSepomex);
registerUser(app, dbMedirec);
loginUser(app, dbMedirec);
getProducts(app, dbMedirec);
GetUsers(app, dbMedirec , dbSepomex);
editUsers(app , dbMedirec);
deleteUsers(app,dbMedirec);
GetDoctors(app,dbMedirec);




app.listen(3001, () => {
    console.log('Corriendo en el puerto 3001');
});
