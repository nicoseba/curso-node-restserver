const{response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req,res=response)=>{
  const {correo,password} = req.body


  try {
    //verificar email existe
    const usuario = await Usuario.findOne({correo});

    if(!correo){
      return res.status(400).json({
        msg: 'Credenciales de acceso no validas'
      })
    }
    //verificar estado de usuario 
    if (!usuario.estado){
      return res.status(400).json({
        msg: 'El usuario no existe'
      })
    }

    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'La contraseña es incorrecta'
      })
    }
    
    //generar JWT 
    const token = await generarJWT(usuario.id);



    res.json({
      token,
      usuario
    })



  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contacte con el administrador'
    })
  }
};


module.exports = {
  login
}