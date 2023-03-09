export interface IUsuario{
    codigo: string;
    nombre: string;
    correo: string;
    password: string;
    roles?: string[];
    created?: Date;
    ultimoAcceso?: Date;
}

export const DefaultUser: IUsuario ={
    codigo: "",
    nombre: "",
    correo: "",
    password: ""
}