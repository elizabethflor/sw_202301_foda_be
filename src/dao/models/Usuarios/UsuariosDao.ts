import { MongoDAOBase } from "@server/dao/MongoDAOBase";
import { IDBConnection } from "@dao/IDBConnection";
import { IUsuario, DefaultUser} from "./IUsuarios";

export class UsuariosDao extends MongoDAOBase<IUsuario>{
  constructor(conexion: IDBConnection){
      super("usuarios", conexion);
  }

  public async create(user: Partial<IUsuario>){
    const newUser = {...DefaultUser,...user};
    return this.create(newUser);
  }
}
