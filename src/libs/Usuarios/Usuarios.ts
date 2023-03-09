import { IUsuario } from "@dao/models/Usuarios/IUsuarios";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";
import { Security } from "@server/utils/Security";

export class Usuarios {
    //private usuarios: IUsuario[];
    private dao: IDataAccessObject;
    constructor(dao: IDataAccessObject) {
        this.dao = dao;
    }

    getAll() {
        return this.dao.findAll();
    }

    getById(id: string) {
        return this.dao.findByID(id);
    }

    add(nuevoUsuario: IUsuario) {
        const date = new Date();
        const nuevo: IUsuario = {
            ...nuevoUsuario,
            created: date,
            ultimoAcceso: date,
        }

       return this.dao.create(nuevo);
    }

    updated(id: string, updatedUsuario: IUsuario) {

        const updateObject = { ...updatedUsuario, ultimoAcceso: new Date() };
        return this.dao.update(id, updateObject);

    }

    delete(id: string) {
        return this.dao.delete(id);
    }

    public async loginUser(email:string, password:string){
        try {
           // const dbUser = this.
        } catch (err) {
            console.error(err);
            return null;
            
        }
    }
}