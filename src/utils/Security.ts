import * as bycrypt from 'bcryptjs'


export class Security {
    public static encondePassword(rawPassword: string){
        return bycrypt.hashSync(rawPassword, 10);

    }
    public static verifyPasswor(rawPassword: string, encondePassword:string){
        return bycrypt.compareSync( rawPassword, encondePassword);
    }
}