const { request, response } = require("express");



const esAdminRol = (req = request, res = response , next)=>{
  if(!req.usuario){
    return res.status(500).json({
      msg: 'Se quiere verificat el usuario sin validar el token'
    })
  }
  
  const {rol, nombre} = req.usuario;
  if(rol !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: `${nombre} no es Administrador - no esta autorizado`
    })
  }
  next();
}


const tieneRol = (...roles)=> {
  return (req = request, res = response , next)=> {
    if(!req.usuario){
      return res.status(500).json({
        msg: 'Se quiere verificat el usuario sin validar el token'
      })
    }
    if(!roles.includes(req.usuario.rol)){
      return res.status(401).json({
        msg: `${req.usuario.nombre} no cuenta con uno de los roles autorizados ${roles}`
      })
   }
  
   next();
 }
}

module.exports = {
  esAdminRol,
  tieneRol
}