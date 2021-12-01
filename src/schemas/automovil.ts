import {Schema, model } from 'mongoose'
import { Personal } from '../classes/personal'

// Definimos el Schema
const automovilSchema = new Schema({
    _placa_mat: {
        type: String,
        unique: true  //índice único
    },
    _tipoObjeto: {
        type: String  //Valores "A, "T"...
    },
    _precioBase: {
        type: Number
    },
    _potenciaMotor: {
        type: Number
    },
    _traccion: {
        type: String
    }

})


export type iAuto = {
    _placa_mat: string | null,
    _tipoObjeto: string | null,
    _precioBase: number | null,
    _potenciaMotor: number | null,
    _personal: Personal[] | null,
  }

  export type iTodoTerreno = {
    _placa_mat: string | null,
    _tipoObjeto: string | null,
    _precioBase: number | null,
    _potenciaMotor: number | null,
    _traccion: string | null,
    _personal: Personal[] | null
  }
  export type tAutomovil = {     //esta es para la sacada de los datos from ANJ
    _placa_mat: string,
    _tipoObjeto: string,
    _precioBase: number,
    _potenciaMotor: number,
    _traccion: string
}
export type tAutomovil2 = {     //esta es para la sacada de los datos from ANJ
    _placa_mat: string,
    _tipoObjeto: string,
    _precioBase: number,
    _potenciaMotor: number,
    _traccion: string,
    _personal: Personal[],
   
}
  export type iCarga = { //SELF: is it needed for anything?
    _placa_mat: string,
    _tipoObjeto: string,
    _precioBase: number,
    _potenciaMotor: number,
    _personal: [Personal], //is this the old way?
    _traccion: string
}

// La colección de la BD (Plural siempre)
export const Autos = model('automoviles', automovilSchema)