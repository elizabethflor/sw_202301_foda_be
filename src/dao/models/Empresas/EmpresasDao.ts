import { MongoDAOBase } from "@server/dao/MongoDAOBase";
import { IDBConnection } from "@dao/IDBConnection";
import { IEmpresa } from "./IEmpresas";

export class EmpresasDao extends MongoDAOBase<IEmpresa>{
  constructor(conexion: IDBConnection){
      super("empresas", conexion);
  }
}
