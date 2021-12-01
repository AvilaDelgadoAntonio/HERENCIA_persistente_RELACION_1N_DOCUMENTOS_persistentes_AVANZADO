import { Personal} from './personal'
export class Automovil {
  private _placa_mat: string;
  protected _precioBase: number; // para acceder en la subclase
  private _potenciaMotor: number;
  private _personal: Array<Personal>;
  constructor(placa_mat: string, precioBase: number, potenciaMotor: number) {
    this._placa_mat = placa_mat;
    this._precioBase = precioBase;
    this._potenciaMotor = potenciaMotor;
    this._personal = new Array<Personal>();
  }

  get placa_mat() {
    return this._placa_mat;
  }
  get precioBase() {
    return this._precioBase;
  }
  get potenciaMotor() {
    return this._potenciaMotor;
  }
  get personal() {
    return this._personal;
  }
  set potenciaMotor(_potenciaMotor: number){
    /*
        Si la potencia Motor no es la permitida
        levantamos una excepción con throw y su mensaje
        En otro caso asignamos la potencia al vehículo
    */
    if (this._potenciaMotor <= 0){
        throw "Potencia incorrecta, debe ser > 0"
    }
    this._potenciaMotor = _potenciaMotor
}
  precio(): number {
    let precio: number;
    precio = this._precioBase;
    if (this._potenciaMotor > 150) {
      precio += 0.2 * precio;
    }
    return precio;
  }
  public addPersona(personal: Personal) { //comes from ANJ, any value added?
    this._personal.push(personal);
  }
  /*public removePersona(personal: Personal) { //comes from ANJ, any value added?
    let index = this._personal.indexOf(personal);
    if (index > -1) {
      this._personal.splice(index, 1);
    }
  }*/
  public getPersona(index: number) { //comes from ANJ, any value added?
    return this._personal[index];
  }
  public sueldoTotal(){ //comes from ANJ, any value added?
    let sueldoT: number = 0
    for (let personal of this._personal){
      sueldoT += personal.calcularSueldo()
    }
    return sueldoT
  }
  public getPersonas() { //comes from ANJ, any value added?
    return this._personal;  }

  completo() {
    return `Matrícula: ${this._placa_mat}, Precio base: ${this._precioBase}, potencia: ${this._potenciaMotor} `;
  }
  abreviado() {
    return `Matrícula: ${this._placa_mat}, potencia: ${this._potenciaMotor}, `;
  }
  /*perimetro(){
    let perimetro: number
    perimetro = this._base+this._lado2+this._lado3
    if (perimetro == 0){
        throw "Triángulo no creado"
    }
    return perimetro
}

area(){
    if (isNaN(this._altura)){
        throw "Altura no asignada"
    }
    return (this._base*this._altura)/2
}*/
  }
