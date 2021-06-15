const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config.db')


class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.USUARIOS_PATH = '/api/usuarios';
    this.AUTH_PATH = '/api/auth';

    //conectar base de datos
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas
    this.routes();
  }

  async conectarDB(){
    await dbConnection();
  }

  routes(){
    
    this.app.use(this.AUTH_PATH,require('../routes/auth.routes'));
    this.app.use(this.USUARIOS_PATH,require('../routes/user.routes'));

  }

  listen(){
    this.app.listen(this.port, ()=> {
      console.log(`app desplegada en https://localhost:${this.port}`);
    });
  }

  middlewares(){
    //cors
    this.app.use(cors());

    //lectura y parseo
    this.app.use(express.json());

    //direcctorio publico
    this.app.use(express.static('public'));

    
  }
}

module.exports = Server;