const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
  const existeRol = await Role.findOne({rol});
  if(!existeRol){
    throw new Error(`El ${rol} no existe en la base de datos`);
  }
};

const emailExiste = async (correo = '') => {
  const existeCorreo = await Usuario.findOne({correo});
  if( existeCorreo ){
    throw new Error('El correo ya se encuentra en la base de datos')
  }
};

const existeUsuarioId = async( id ) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const existeUsuario = await Usuario.findById( id ).exec();
      if ( !existeUsuario ) {
          throw new Error(`El id ${ id } no existe`);
      }
  } else {
      throw new Error(`${ id } no es un ID válido`);
  }
};



module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioId
}