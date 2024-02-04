import { Cargo } from "./Cargo";
import { Deparmento } from "./Departamento";

export interface User {
    id?: number;
    usuario: string;
    email: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    estaActivo: boolean;
    idDepartamento: number;
    idCargo: number;
    cargo?: Cargo;
    departamento?: Deparmento;
}