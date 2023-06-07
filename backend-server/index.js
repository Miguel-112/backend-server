

const express = require('express');
// crear el servidor express
require('dotenv').config();

const cors = require('cors')


const {dbConection} = require('./database/config');

const app = express();

// configuracion cors
app.use(cors())

    // Base de datos
dbConection();

console.log(process.env);
//Rutas
app.get('/', (req, res)=>{

    res.json({
        ok:true,
        msg:"hola mundo"

    })

});

app.listen(process.env.PORT,()=>{
    console.log('servidor corriendo en el puerto'+process.env.PORT);
});