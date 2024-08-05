import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import fs from 'fs';
import multer from 'multer';

import { getEstadoYMunicipio } from './JavaScript/Users/getEstadoYMunicipio.js';
import { getColonias } from './JavaScript/Users/getColonias.js';
import { registerPaciente } from './JavaScript/Users/registerPaciente.js';
import { loginUser } from './JavaScript/Access/loginLogic.js';
import { getProducts } from './JavaScript/Users/getProducts.js';
import { GetUsers } from './JavaScript/Admin/Users/GetUsers.js';
import { editUsers } from './JavaScript/Admin/Users/editUsers.js';
import { deleteUsers } from './JavaScript/Admin/Users/deleteUsers.js';
import { GetDoctors } from './JavaScript/Admin/Doctors/GetDoctors.js';
import { editDoctors } from './JavaScript/Admin/Doctors/EditDoctors.js';
import { deleteDoctor } from './JavaScript/Admin/Doctors/deleteDoctor.js';
import { RegisterDoctor } from './JavaScript/Admin/Doctors/RegisterDoctor.js';
import { GetProducts } from './JavaScript/Admin/Products/GetProducts.js';
import { EditProduct } from './JavaScript/Admin/Products/EditProduct.js';
import { DeleteProduct } from './JavaScript/Admin/Products/deleteProduct.js';
import { RegisterProduct } from './JavaScript/Admin/Products/RegisterProduct.js';
import { registerUser } from './JavaScript/Users/registerUser.js';
import { getUser } from './JavaScript/Doctor/Users/getUser.js';


// Configuración de la conexión para Medirec
const dbMedirecConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // Ajusta esto si tienes una contraseña
    database: 'medirecactreact',
    port: '3306'
};

// Configuración de la conexión para Sepomex
const dbSepomexConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sepomex',
    port: '3306'
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


getEstadoYMunicipio(app, dbMedirec);
getColonias(app, dbMedirec);
registerPaciente(app, dbMedirec);
registerUser(app, dbMedirec);
loginUser(app, dbMedirec);
getProducts(app, dbMedirec);
GetUsers(app, dbMedirec , dbSepomex);
editUsers(app , dbMedirec);
deleteUsers(app,dbMedirec);
GetDoctors(app,dbMedirec);
editDoctors(app,dbMedirec);
deleteDoctor(app,dbMedirec);
RegisterDoctor(app,dbMedirec);
GetProducts(app,dbMedirec);
EditProduct(app,dbMedirec);
DeleteProduct(app,dbMedirec);
RegisterProduct(app,dbMedirec);
getUser(app, dbMedirec);



app.listen(3001, () => {
    console.log('Corriendo en el puerto 3001');
});
