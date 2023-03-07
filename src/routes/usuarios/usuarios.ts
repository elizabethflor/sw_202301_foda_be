import express from 'express';
const router = express.Router();

import { UsuariosDao } from '@dao/models/Usuarios/UsuariosDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IUsuario } from "@dao/models/Usuarios/IUsuarios";
import { Usuarios } from '@libs/Usuarios/Usuarios';

const usuariosDao = new UsuariosDao(MongoDBConn);
let usuariosModel: Usuarios;
usuariosDao.init().then(() =>{
    usuariosModel = new Usuarios(usuariosDao);
});

router.get('/', (_req,res) =>{
    const jsonUrls ={
        "getAll": {"method": "get", "url": "usuarios/all"},
        "getById": {"method": "post", "url": "usuarios/byid/:id"},
        "new": {"method": "post", "url": "usuarios/new"},
        "update": {"method": "put", "url": "usuarios/upd/:id"},
        "delete": {"method": "delete", "url": "usuarios/del/:id"},
    }
    res.status(200).json(jsonUrls);
});

router.get('/all', async (_req,res) =>{
    console.log(usuariosModel.getAll());
    res.status(200).json(await usuariosModel.getAll());
});

router.get('/byid/:id', async (req,res) =>{
    const {id: codigo} = req.params;
    const usuario = await usuariosModel.getById(codigo);

    if(usuario){
        return res.status(200).json(usuario);
    }

    return res.status(404).json({"error": "No se encontró usuario"});
});

router.post('/new', async (req,res) =>{
    const {
        codigo = "NA",
        nombre= "elizabeth",
        correo= "elizabeth_vz@unicah.edu",
        password= "7891002"
    } = req.body;

    const newUser: IUsuario = {
        codigo,
        nombre,
        correo,
        password
    };

    if(await usuariosModel.add(newUser)) {
        return res.status(200).json({"created": true});
    }

    return res.status(404).json(
        {"error": "Error al agregar un nuevo usuario"}
    );
});

router.put('/upd/:id', async (req,res) =>{
    const { id } = req.params;
    const {
        nombre= "----NotRecieved------",
        correo= "----NotRecieved------",
        password= "----NotRecieved------",
        codigo = ""
    } = req.body;

    if (
        nombre === "----NotRecieved------"
        || correo === "----NotRecieved------"
      ) {
        return res.status(403).json({"error":"Debe venir el nombre y correo correctos"});
      }

    const UpdateUsuario: IUsuario ={
        codigo,
        nombre,
        correo,
        password
    }

    if(await usuariosModel.updated(id, UpdateUsuario)){
        return res
        .status(200)
        .json({"updated": true});
    }

    return res
    .status(404)
    .json(
        {"error": "Error al actualizar usuarios"}
        );
});

router.delete('/del/:id', async (req,res) =>{
    const {id } = req.params;

    if(await usuariosModel.delete(id)){
        return res.status(200).json({"deleted": true});
    }

    return res.status(404).json({"error": "No se pudo eliminar usuario"});
});

export default router;