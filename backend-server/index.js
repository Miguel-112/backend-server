

const express = require('express');
// crear el servidor express
require('dotenv').config();

const cors = require('cors')


const {dbConection} = require('./database/config');

const app = express();

// configuracion cors
app.use(cors());

// lectura y parseo del body


//carpeta publica

app.use(express.static('public'));

app.use(express.json());

    // Base de datos
dbConection();

// console.log(process.env);
//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));



app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en el puerto'+process.env.PORT);
});