import {Schema, model } from 'mongoose'
const personalSchema = new Schema({
    _DNI: {
        type: String,
        unique: true  //índice único
    },
    _tipoNacionalidad: {
        type: String  //Valores "ESP", "EXT"...
    },
    _nombre: {
        type: String
    },
    _sueldo: {
        type: Number
    },
    _MatAutoConducido: {
        type: String
    },
    _PermisoConducir: {
        type: Boolean  //Valores "true", "false"...
    },
    _idioma: {
        type: String
    },
    _fechaConducido: {
        type: Date
    },
})


export type iPersonal = {
    _DNI: string | null;
    _tipoNacionalidad: string | null;
    _nombre: string | null;
    _sueldo: number | null;
    _MatAutoConducido: string | null;
    _PermisoConducir: boolean | null;
    _fechaConducido: Date | null;
}

export type iPersonal2 = {
    _DNI: string;
    _tipoNacionalidad: string;
    _nombre: string;
    _sueldo: number;
    _MatAutoConducido: string;
    _PermisoConducir: boolean;
    _idioma: string;
    _fechaConducido: Date;
}
export type iPersonal_extranjero = {
    _DNI: string | null;
    _tipoNacionalidad: string | null,
    _nombre: string | null;
    _sueldo: number | null;
    _MatAutoConducido: string | null;
    _PermisoConducir: boolean | null;
    _idioma: string | null;
    _fechaConducido: Date | null;
    
}
// La colección de la BD (Plural siempre)
export const Pers = model('personales', personalSchema)