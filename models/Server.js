const express = require('express');
const cors = require('cors');


class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.USUARIOS_PATH = '/api/usuarios';

    //Middlewares
    this.middlewares();
    //Rutas
    this.routes();
  }

  routes(){
    
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