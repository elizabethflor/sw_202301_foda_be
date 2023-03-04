import { MongoDAOBase } from "@dao/MongoDAOBase"
import { IDBConnection } from "@server/dao/IDBConnection";
import { IFoda, DefaultFoda } from "./IFoda";
import { IDataAccessObject } from "@dao/IDataAccessObject";
import { ObjectId } from "mongodb";

export class Foda extends MongoDAOBase<IFoda> {
    private empresaDAO: IDataAccessObject;
    constructor(conexion: IDBConnection, empresasDAO: IDataAccessObject){
        super("foda", conexion);
        this.empresaDAO = empresasDAO
    }

    public async create(foda: IFoda){
        const { empresa: { id } } = foda;

        if(ObjectId.isValid(id)){
            throw Error("Empresa Object Id not Valid")
        }

        const {_id, nombre} = await this.empresaDAO.findByID(id.toString());
        const newFoda = {
            ...DefaultFoda,
            ...foda,
            ...{empresa:{id:_id, nombre}},
            ...{createdAt: new Date(), updatedAt: new Date()}};
        newFoda.empresa = {id:_id, nombre};
        newFoda.createdAt = new Date();
        newFoda.updatedAt = new Date();
        return super.create(newFoda);
    }
}