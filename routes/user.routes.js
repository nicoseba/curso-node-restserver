const {Router}= require('express');
const { userGet,
   userPut,
    userPost,
     userDelete,
      userPatch } = require('../controller/user.controller')
const router = Router();

//
router.get('/', userGet);
//nombrar los parametros de segmentos
router.put('/:id', userPut)
//
router.post('/', userPost)
//
router.delete('/', userDelete)
//
router.patch('/', userPatch)







module.exports = router;