const express = require('express'); //Importar paquete
const app = express();  //Inicializar nuestra app
const http = require('http'); //Importar Http
const server = http.createServer(app);//Crear servidorcoi
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer'); //firebase
const admin = require('firebase-admin'); //firebase
const serviceAccount = require('./serviceAccountKey.json') //firebase


//INICIALIZAR FIREBASE ADMIN
admin.initializeApp({
    cedential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})

/*
* RUTAS
*/
const users = require('./routes/usersRoutes');
const User = require('./models/user');


const port = process.env.PORT || 3000; //Definir puerto que escucha nuestro servidor

app.use(logger('dev')); //Logger para desarrollo para debugar erroes
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());  

app.disable('x-powered-by');



app.set('port', port); //Confiturar puerto


//Llamandoa las rutas
users(app,upload);

// server.listen(3000,'192.168.10.19' || 'localhost', function(){
server.listen(port, function(){
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
});

app.get('/',(req,res)=>{
    res.send('Ruta raiz del backend para SMARTFARM');
})

//  ERROR HANDLER
app.use((err,req,res,next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
})

module.exports = {
    app: app,
    server: server
}