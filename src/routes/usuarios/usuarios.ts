import express from 'express';
const router = express.Router();

import { Usuarios, IUsuario} from '@libs/Usuarios/Usuarios';
const usuariosModel = new Usuarios();

usuariosModel.add({
    codigo: '',
    nombre: 'idalia',
    correo: 'ie_floresv@unicah.edu',
    password: '123456'
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

router.get('/all',(_req,res) =>{
    res.status(200).json(usuariosModel.getAll());
});

router.get('/byid/:id', (req,res) =>{
    const {id: codigo} = req.params;
    const usuario = usuariosModel.getById(codigo);

    if(usuario){
        return res.status(200).json(usuario);
    }

    return res.status(404).json({"error": "No se encontró usuario"});
});

router.post('/new', (req,res) =>{
    const {
        nombre= "elizabeth",
        correo= "elizabeth_vz@unicah.edu",
        password= "7891002"
    } = req.body;

    const newUser: IUsuario = {
        codigo: "",
        nombre,
        correo,
        password
    };

    if(usuariosModel.add(newUser)){
        res.status(200).json({"created": true});
    }

    return res.status(404).json({"error": "Error al agregar un nuevo usuario"})
});

router.put('/upd/:id', (req,res) =>{
    const { id } = req.params;
    const {
        nombre= "elizabeth",
        correo= "elizabeth_vz@unicah.edu",
        password= "7891002"
    } = req.body;

    const UpdateUsuario: IUsuario ={
        codigo: id,
        nombre,
        correo,
        password
    }

    if(usuariosModel.updated(UpdateUsuario)){
        res.status(200).json({"updated": true});
    }

    return res.status(404).json({"error": "Error al actualizar usuarios"});
});

router.delete('/del/:id', (req,res) =>{
    const {id: codigo} = req.params;

    if(usuariosModel.delete(codigo)){
        return res.status(200).json({"deleted": true});
    }

    return res.status(404).json({"error": "No se pudo eliminar usuario"});
});

export default router;