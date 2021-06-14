const {Router}= require('express');
const { check } = require('express-validator');
const {esRoleValido,emailExiste,existeUsuarioId} = require('../helpers/db-validator')
const {validarCampos} = require('../middlewares/validar-campos');
const { userGet,
   userPut,
    userPost,
     userDelete,
      userPatch } = require('../controller/user.controller')
const router = Router();

//
router.get('/', userGet);
//nombrar los parametros de segmentos
router.put('/:id',[
      check('id').custom(existeUsuarioId),
      check('rol').custom( esRoleValido ),
      validarCampos
], userPut)
//
router.post('/', [ 
      check('nombre','El nombre es obligatorio').not().isEmpty(),
      check('password','El password debe tener como minimo 6 caracteristica').isLength({min: 6}),
      check('correo','Correo no valido').isEmail(),
      check('correo').custom( emailExiste ),
      check('rol').custom( esRoleValido ),
      validarCampos
],  userPost)
//
router.delete('/:id',[
      check('id').custom(existeUsuarioId),
      validarCampos
], userDelete)
//
router.patch('/', userPatch)







module.exports = router;