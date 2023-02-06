export interface IUsuario{
    codigo: string;
    nombre: string;
    correo: string;
    password: string;
    roles?: string[];
    created?: Date;
    ultimoAcceso?: Date;
}

export class Usuarios{
    private usuarios: IUsuario[];

    constructor(){
        this.usuarios = [];
    }

    getAll(){
        return this.usuarios;
    }

    getById(codigo: string){
        const usuarioToReturn = this.usuarios.find((user) =>{
            return user.codigo === codigo;
        });

        return usuarioToReturn;
    }

    add(nuevoUsuario: IUsuario){
        const date = new Date();
        const nuevo: IUsuario ={
            ...nuevoUsuario,
            codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
            created: date,
            ultimoAcceso: date,
        }

        this.usuarios.push(nuevo);
        return true;
    }

    updated(updatedUsuario: IUsuario){
        let updated = false;

        const newUser: IUsuario[] = this.usuarios.map((user) =>{
            if(user.codigo === updatedUsuario.codigo){
                updated = true;
                return{...user, ...updatedUsuario, ultimoAcceso: new Date()};
            }

            return user;
        });

        this.usuarios = newUser;
        return updated;
    }

    delete(codigo: string){
        const userToDelete = this.usuarios.find((user)=>{
            return user.codigo === codigo;
        });

        if(userToDelete){
            const newUser: IUsuario[] = this.usuarios.filter((user) =>{
                return user.codigo !== codigo;
            });
            this.usuarios = newUser;
            return true;
        }

        return false;
    }




}