import { MongoDAOBase } from "@server/dao/MongoDAOBase";
import { IDBConnection } from "@dao/IDBConnection";
import { IUsuario } from "./IUsuarios";

export class UsuariosDao extends MongoDAOBase<IUsuario>{
  constructor(conexion: IDBConnection){
      super("usuarios", conexion);
  }
}
