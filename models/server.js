const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const { validarJSON } = require('../middlewares/validar-json');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // Prefijos de rutas -> Igual que el prefix routes de flask
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares -> Funciones que añaden otra funcionalidad al server
        this.middlewares()

        // Rutas de la aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS -> Protger el acceso a la API desde otros orígenes
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'))

        // Validar JSON recibido
        this.app.use(validarJSON);
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servdor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;