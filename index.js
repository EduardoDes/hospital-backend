const express = require('express');
require('dotenv').config();
const cors = require('cors')

const {dbConnection} = require('./database/config')

//Creacion de servidor express
const app = express();

//Configurar CORS
app.use(cors());

//Conexion a BD
dbConnection();


app.get('/', (req, res) => {

    res.json({ok : true , msg : 'Hola Mundo'})

})
 

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' , process.env.PORT);
})