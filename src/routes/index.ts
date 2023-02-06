import express from 'express';
const router  = express.Router();

import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';

//rest api
//internet -> http -> rest api -> db
//soap xml wsdl
//{} -> json
//[] -> json
//{ llave: valor}
// valor: texto, numerico, booleano, array[valores], objeto{llave: valor}

// REST: stateledd, resource unique representation
//CRUD create, read, update, delete
//get, put, delete, post son parte de los 32 metodos de peticiones de http

//localhost:3001
router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.get('/version', (_req, res)=>{
    const version:string = "1.0.0"; //declarando que siempre sera un string
    const jsonResp = {"name": "FODA Be", "version": version};
    res.json(jsonResp);
 });

 router.use('/empresas', empresasRouter);
 router.use('/usuarios', usuariosRouter);
 //router.get
 //router.post
 //router.put
 //router.delete
 //router.use

export default router;
