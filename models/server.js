const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // Prefijos de rutas -> Igual que el prefix routes de flask
        this.usuariosPath = '/api/usuarios';

        // Middlewares -> Funciones que añaden otra funcionalidad al server
        this.middlewares()

        // Rutas de la aplicación
        this.routes();
    }

    middlewares(){
        // CORS -> Protger el acceso a la API desde otros orígenes
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servdor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;