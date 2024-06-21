export class Cliente {
    clienteID : number = 0;
    nombre : string = "";
    apellido : string = "";
    correo : string = "";
    telefono : string = "";
    direccion : string = "";
    fechaNacimiento ?: Date;
    fechaRegistro ?: Date;
}