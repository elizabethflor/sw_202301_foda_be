import { IDataAccessObject } from "@dao/IDataAccessObject";
import { FodaDao } from "@dao/models/FODA/FodaDao";
import { IFoda, IFodaEstados } from "@dao/models/FODA/IFoda";
import { ObjectId } from "mongodb";

export class Foda {
  private fodaDao: FodaDao;
  constructor(foda: IDataAccessObject) {
    this.fodaDao = foda as FodaDao;

  }
  public async newFoda(nombre: string, empresaId: string) {
    try {
      const newFoda = {...{ empresa: { id: empresaId }, nombre } };
      const result = await this.fodaDao.create(newFoda);
      console.log('newFoda result:', result);
      const rt = await this.fodaDao.findByFilter({ _id: result?.insertedId });
      return rt;
    } catch (ex) {
      console.error('newFoda error:', ex);
      return null;
    }
  }
  public async updateFoda(fodaId: string, type: 'F' | 'D' | 'O' | 'A') {
    const result = await (this.fodaDao as FodaDao).updateCounter(fodaId, type);
    console.log('updateFoda:', result);
    const rt = await this.fodaDao.findByID(fodaId);
    return rt;
  }
  private async setUpdates(fodaId, updateCmd: Partial<IFoda>) {
    await this.fodaDao.update(fodaId, { ...updateCmd, updatedAt: new Date() });
    const updatedFoda = await this.fodaDao.findByID(fodaId);
    return updatedFoda;
  }
  public setObservation(fodaId: string, observation: string) {
    return this.setUpdates(fodaId, { observacion: observation });
  }
  public setNombre(fodaId: string, nombre: string) {
    return this.setUpdates(fodaId, { nombre: nombre });
  }
  public setEstado(fodaId: string, estado: IFodaEstados) {
    return this.setUpdates(fodaId, { estado });
  }
  public getAllFromEmpresa(empresaId: string) {
    return this.fodaDao.findByFilter({ "empresa.id": new ObjectId(empresaId) });
  }
}

///  const [t5,,t3] = [5,9,3,1,4];