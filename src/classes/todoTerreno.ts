import { Automovil } from './automovil';
//import { Personal } from './personal'; //doble relación
export class TodoTerreno extends Automovil {
  private _traccion: string;
  constructor(placa_mat: string, precioBase: number, potenciaMotor: number, traccion: string) {
    super(placa_mat, precioBase, potenciaMotor);
    this._traccion = traccion;
  }
  get traccion() {
    return this._traccion;
  }
  // sobre escribimos los dos métodos de abajo
  precio(): number {
    let precio: number;
    precio = super.precio();
    if (this._traccion == '4x4') {
      precio += 0.1 * precio;
    }
    return precio;
  }

  completo(){
    let resultado: string
    resultado = `${super.completo()}, tracción: ${this._traccion} `
    return resultado
  }
}
