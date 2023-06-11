

const express = require('express');
// crear el servidor express
require('dotenv').config();

const cors = require('cors')


const {dbConection} = require('./database/config');

const app = express();

// configuracion cors
app.use(cors());

// lectura y parseo del body

app.use(express.json());

    // Base de datos
dbConection();

// console.log(process.env);
//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));

app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en el puerto'+process.env.PORT);
});