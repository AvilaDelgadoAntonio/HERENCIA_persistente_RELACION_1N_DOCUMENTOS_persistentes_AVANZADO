import { Personal } from './personal';
export class Personal_extranjero extends Personal {
  private _idioma: string;
  constructor(
    DNI: string, 
    nombre: string, 
    sueldo: number, 
    MatAutoConducido: string,
    PermisoConducir: boolean, 
    idioma: string, 
    fechaConducido: any) {
    super(DNI, nombre, sueldo, MatAutoConducido, PermisoConducir, fechaConducido);
    this._idioma = idioma;
  }
  get idioma() {
    return this._idioma;
  }
  todo() {
    let resultado: string
    resultado = `${super.todo()}, idioma: ${this._idioma} `
    return resultado
}
}