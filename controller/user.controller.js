const {response} = require('express');
const bcryptjs = require('bcryptjs'); 
const Usuario = require('../models/usuario');





const userGet = async(req, res = response) => {

  const {limite = 5,desde = 0} = req.query;
  const query = {estado: true};
  
  const [total,usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ]);
  res.json({
    total,
    usuarios,
  });
};

const userPut = async (req, res = response) => {

  const { id } = req.params;
  const { _id , password , google , correo , ...resto} = req.body;
  
  
  //TODO: validar contra base de datos
  if(password){
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario  = await Usuario.findByIdAndUpdate(id, resto);


  res.json(usuario);
}



const userPost = async (req, res = response) => {

  
  
  const { nombre , password , correo , rol } = req.body;
  const usuario = new Usuario({nombre,correo,password,rol});

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guarda en la DB 
  await usuario.save();
  res.json(usuario);
}



const userDelete = async(req, res = response) => {
  
  const {id} = req.params;

  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})

  res.json({
    usuario
  });
}


const userPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controllador'
  });
}

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch
}