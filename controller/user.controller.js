const {response} = require('express')

const userGet = (req, res = response) => {

  const {q,nombre='NN',apikey} = req.query;

  res.json({
    msg: 'get API - controllador',
    q,
    nombre,
    apikey
  });
};

const userPut = (req, res = response) => {

  const id = req.params.id;
  res.json({
    msg: 'put API - controllador',
    id
  });
}

const userPost = (req, res = response) => {

  const body = req.body;
  res.json({
    msg: 'post API - controllador',
    body
  });
}
const userDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - controllador'
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