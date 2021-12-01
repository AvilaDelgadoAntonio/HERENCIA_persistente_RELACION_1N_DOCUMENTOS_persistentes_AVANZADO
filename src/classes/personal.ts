export class Personal {
    private _DNI: string;
    //protected _tipoNacionalidad: string; // para acceder en la subclase
    private _nombre: string;
    private _sueldo: number;
    private _MatAutoConducido: string;
    private _PermisoConducir: boolean;  
    private _fechaConducido: Date;   
    
    constructor(
        DNI: string, 
        nombre: string, 
        sueldo: number, 
        MatAutoConducido: string, 
        PermisoConducir: boolean,
        fechaConducido: any
        ) {
        this._DNI = DNI;
        //this._tipoNacionalidad = tipoNacionalidad;
        this._nombre = nombre;
        this._sueldo = sueldo;
        this._MatAutoConducido = MatAutoConducido;
        this._PermisoConducir = PermisoConducir;
        this._fechaConducido = fechaConducido;
    }

    get DNI() {
        return this._DNI;
    }
    /*get tipoNacionalidad() {
        return this._tipoNacionalidad;
      }*/
    get nombre() {
        return this._nombre;
    }
    get sueldo() {
        return this._sueldo;
    }
    get MatAutoConducido() {
        return this._MatAutoConducido;
    }
    get PermisoConducir() {
        return this._PermisoConducir;
    }
    get fechaConducido() {
        return this._fechaConducido;
    }
    set PermisoConducir(_PermisoConducir: boolean){
        /*
            Si la persona no tiene permiso de conducir
            levantamos una excepción con throw y su mensaje
                    */
        if (this._PermisoConducir == false){
            throw "Es ilegal ser conductor sin permiso de conduccir"
        }
        this._PermisoConducir = _PermisoConducir
    }
    calcularSueldo(): number {
        return this._sueldo; //comes from ANJ.
    }
    /*public sacaPersona(index: number) { //comes from ANJ, modified by SELF, any value added?
        return this._DNI[index];*/
    /*public sacaPersonas() { //comes from ANJ, modified by SELF, any value added?
            return this._DNI;  }*/
    
    todo() {
        return `DNI: ${this._DNI}, Nombre: ${this._nombre}, Sueldo: ${this._sueldo}, Automovil: ${this._MatAutoConducido}, Permiso de Conducir: ${this._PermisoConducir}, Fecha de conducción: ${this._fechaConducido}`
    }
}