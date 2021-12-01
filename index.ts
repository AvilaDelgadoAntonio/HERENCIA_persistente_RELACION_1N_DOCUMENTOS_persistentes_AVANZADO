import { menu_AAD } from './src/auxiliar/menu'
import { leerTeclado } from './src/auxiliar/lecturaTeclado'
import { Automovil } from './src/classes/automovil';
import { TodoTerreno } from './src/classes/todoTerreno';
import { Autos, iAuto, iTodoTerreno, tAutomovil2, iCarga } from './src/schemas/automovil'
import { iPersonal, Pers, iPersonal2, iPersonal_extranjero } from './src/schemas/personal';
import { Personal } from './src/classes/personal';
import { Personal_extranjero } from './src/classes/personal_extranjero';
import { db } from './src/database/database'

const main = async () => {
    let n: number
    //let m1: string
    //let n1: number
    //let f1: string
    let local: string = "N"
    let placa_mat: string, precioBase: number, potenciaMotor: number, personal: Array<Personal>, traccion: string
    let DNI: string, nombre: string, sueldo: number, MatAutoConducido: string, PermisoConducir: boolean, fechaConducido: Date
    let personales: Array<Personal> = new Array<Personal>();
    let automoviles: Array<Automovil> = new Array<Automovil>();
    //let seleccionado: string | any;
   // let automoviles: Automovil = new Automovil("", 0, 0, []);


    //let automoviles: Array<Automovil> = new Array<Automovil>();    
    //let todoTerreno: TodoTerreno = new TodoTerreno("", 0, 0, [], "");


    await setBD(true) // true BD local; false BD Atlas
    //let seleccionado: string | any;

    do {
        n = await menu_AAD()

        switch(n){
            case 0:                
            local = await leerTeclado('Ponga [S] para conectarse a BD Atlas (Nube)? (en caso [N], conexión a BD local)')
            if (local == 'S'){
                await setBD(false)
                console.log('\nCONECTADO a BD Atlas (NUBE)')
            }else{
                await setBD(true)
                console.log('\nCONECTADO a BD LOCAL')
            }
            break
            case 1:
                console.log(`\nEstá en opción 1, crear NUEVO vehículo`)
                let seleccionado: string | any;
                seleccionado =  await leerTeclado('\nTeclee 1 para COCHE o 2 para TODOTERRENO')
             //   let automoviles: Array<Automovil> = new Array<Automovil>();
                if (seleccionado == 1)
                {
                console.log(`\nHa elegido crear un COCHE`)
                //Creación de un coche génerico
                const nuevoAuto = async (automoviles: Array<Automovil>) =>  { 
                let auto: Automovil;
		        const placa_mat = await leerTeclado('\nIntroduzca matrícula')
                const precioBase =  parseInt( await leerTeclado('Introduzca precio base'))
                const potenciaMotor =  parseInt( await leerTeclado('Introduzca potencia motor'))
                const personal =  Array<Personal>()            
                //automoviles = new Automovil(placa_mat, precioBase, potenciaMotor, personal);               
                
                auto = new Automovil (placa_mat, precioBase, potenciaMotor);
                automoviles.push(auto);
                
                try {
                    auto.potenciaMotor = potenciaMotor
                }catch(error){
                    console.log(error)
                    auto = new Automovil("", 0, 0);
                        }
                }
                await nuevoAuto(automoviles)
                }               
                
            else{
                console.log(`\nHa elegido crear un TODOTERRENO`)
        
                //Creación de un Todoterreno
                const nuevoTT = async (automoviles: Array<Automovil>) =>  { 
                let auto: Automovil;
		        const placa_mat = await leerTeclado('\nIntroduzca matrícula')
                const precioBase =  parseInt( await leerTeclado('Introduzca precio base'))
                const potenciaMotor =  parseInt( await leerTeclado('Introduzca potencia motor'))
                const personal =  Array<Personal>()  
                const traccion =  await leerTeclado('Introduzca tracción 4x2 o 4x4')           
                //automoviles = new TodoTerreno(placa_mat, precioBase, potenciaMotor, personal, traccion);               
                
                auto = new TodoTerreno (placa_mat, precioBase, potenciaMotor, traccion);
                automoviles.push(auto);
                
                try {
                    auto.potenciaMotor = potenciaMotor
                }catch(error){
                    console.log(error)
                    auto = new TodoTerreno("", 0, 0, "");
                        }
                }
                await nuevoTT(automoviles)
            }
                //console.log(automoviles)
                const mostrar = async (automoviles: Array<Automovil>) => {
                    for (let a of automoviles) {
                        
                       console.log(`${a.completo()}`);
                    }
                  
                }
            
                mostrar(automoviles)       

                 break
              
            case 2:
                console.log("\nHA ENTRADO EN OPCIÓN 2")
                let elegido: string | any;
                elegido =  await leerTeclado('\nTeclee 1 para persona NACIONAL o 2 para EXTRANJERO')
                if (elegido == 1)
                {
                console.log(`\nHa elegido crear una persona NACIONAL`)
                //Creación de una persona génerica
                const nuevaPersona = async (person: Array<Personal>) =>  { 
                    let humano: Personal;
                    const DNI = await leerTeclado('\nIntroduzca Documento de Identidad del conductor')
                    const nombre =  await leerTeclado('Introduzca nombre y apellidos del conductor')
                    const sueldo =  parseInt( await leerTeclado('Introduzca sueldo del conductor'))
                    const MatAutoConducido =  await leerTeclado('Introduzca matricula asignada a este conductor')
                    const PermisoConducir =  Boolean(await leerTeclado('¿Tiene Permiso de Conducir? (Sí [true], No [false]'))
                    //const fechaConducido =  await leerTeclado('Introduzca la fecha de conducción (formato: AAAA-MM-DD)')
                    const fechaRaw =  await leerTeclado('Introduzca la fecha de conducción (formato: AAAA-MM-DD)')
                    const fechaConducido = new Date(fechaRaw)/*.toISOString()*/ //conversión formato fecha

                    humano = new Personal (DNI, nombre, sueldo, MatAutoConducido, PermisoConducir, fechaConducido);
                    person.push(humano);
                    
                    try {
                        humano.PermisoConducir = PermisoConducir
                    }catch(error){
                        console.log(error)
                        humano = new Personal("","", 0, "", true, "");
                    }
                }
                await nuevaPersona(personales)
                }               
                
            else{
                console.log(`\nHa elegido crear un EXTRANJERO`)
        
                //Creación de un Extranjero
                const nuevaExtranjero = async (personales: Array<Personal>) =>  { 
                    let humano: Personal;
                    const DNI = await leerTeclado('\nIntroduzca Documento de Identidad del conductor')
                    const nombre =  await leerTeclado('Introduzca nombre y apellidos del conductor')
                    const sueldo =  parseInt( await leerTeclado('Introduzca sueldo del conductor'))
                    const MatAutoConducido =  await leerTeclado('Introduzca matricula asignada a este conductor')
                    const PermisoConducir =  Boolean(await leerTeclado('¿Tiene Permiso de Conducir? (Sí [true], No [false]'))
                    const fechaRaw =  await leerTeclado('Introduzca la fecha de conducción (formato: AAAA-MM-DD)')
                    //const fechaConducido = new Date(fechaRaw)/*.toISOString()*/ //conversión formato fecha
                    const fechaConducido = new Date(fechaRaw)/*.toISOString()*/ //conversión formato fecha
                //const personal =  Array<Personal>()  
                const idioma =  await leerTeclado('Introduzca el idioma del conductor')           
                //automoviles = new TodoTerreno(placa_mat, precioBase, potenciaMotor, personal, traccion);               
                
                humano = new Personal_extranjero (DNI, nombre, sueldo, MatAutoConducido, PermisoConducir, idioma, fechaConducido );
                personales.push(humano);                

                    try {
                        humano.PermisoConducir = PermisoConducir
                    }catch(error){
                        console.log(error)
                        humano = new Personal_extranjero("","", 0, "", true, "", "");
                            }
                    }
                    await nuevaExtranjero(personales)
            }
                //console.log(personales)
                const enseñar = async (personales: Array<Personal>) => {
                    for (let a of personales) {
                        
                       console.log(`${a.todo()}`);
                    }
                  
                }            
                enseñar(personales)       

                break
            case 3:
                console.log("\nHA ENTRADO EN OPCIÓN 3")
                console.log("\n¡¡DOCUMENTO GUARDADO CON ÉXITO EN BD!!")
                //let automoviles: Array<TodoTerreno> = new Array<TodoTerreno>();
                let grabarBD = async () => {

                    // Automovil schema
                    let aSchema: any
                    let dShemaAuto: iAuto =
                    {
                      _placa_mat: null,
                      _tipoObjeto: null,
                      _precioBase: null,
                      _potenciaMotor: null,
                      _personal: null
                    }
                    let dShemaTT: iTodoTerreno =
                    {
                      _placa_mat: null,
                      _tipoObjeto: null,
                      _precioBase: null,
                      _potenciaMotor: null,
                      _traccion: null,
                      _personal: null,
                    }
                      // Personal schema
                    let pSchema: any
                    let dShemaPer: iPersonal =
                    {
                        _DNI: null,
                        _tipoNacionalidad: null,
                        _nombre: null,
                        _sueldo: null,
                        _MatAutoConducido: null,
                        _PermisoConducir: null,
                        _fechaConducido: null
                    }
                    let dShemaPerExt: iPersonal_extranjero =
                    {
                        _DNI: null,
                        _tipoNacionalidad: null,
                        _nombre: null,
                        _sueldo: null,
                        _MatAutoConducido: null,
                        _PermisoConducir: null,
                        _idioma: null,
                        _fechaConducido: null
                    }
                    await db.conectarBD()
                    //initialState: null

                    for (let a of automoviles) {
                      // valores comunes ->
                      dShemaAuto._placa_mat = dShemaTT._placa_mat = a.placa_mat
                      dShemaAuto._potenciaMotor = dShemaTT._potenciaMotor = a.potenciaMotor
                      dShemaAuto._precioBase = dShemaTT._precioBase = a.precioBase
                      // Valores propios ->
                      // Hay que preguntar primero por las subclases
                      if (a instanceof TodoTerreno) {
                        dShemaTT._tipoObjeto = "T"
                        dShemaTT._traccion = a.traccion
                        aSchema = new Autos(dShemaTT)
                      } else if (a instanceof Automovil) {
                        dShemaAuto._tipoObjeto = "A"
                        aSchema = new Autos(dShemaAuto)
                      }
                      await aSchema.save()
                    }   
                    for (let p of personales) {
                        // valores comunes ->
                        dShemaPer._DNI =  dShemaPerExt._DNI = p.DNI
                        //dShemaPer._tipoNacionalidad = dShemaPerExt._tipoNacionalidad = p.tipoNacionalidad
                        dShemaPer._nombre = dShemaPerExt._nombre = p.nombre
                        dShemaPer._sueldo = dShemaPerExt._sueldo = p.sueldo
                        dShemaPer._MatAutoConducido = dShemaPerExt._MatAutoConducido = p.MatAutoConducido
                        dShemaPer._PermisoConducir = dShemaPerExt._PermisoConducir = p.PermisoConducir
                        dShemaPer._fechaConducido = dShemaPerExt._fechaConducido = p.fechaConducido
                        // Valores propios ->
                        // Hay que preguntar primero por las subclases
                        if (p instanceof Personal_extranjero) {
                          dShemaPerExt._tipoNacionalidad = "EXT"
                          dShemaPerExt._idioma = p.idioma
                          pSchema = new Pers(dShemaPerExt)
                        } else if (p instanceof Personal) {
                          dShemaPer._tipoNacionalidad = "ESP"
                          pSchema = new Pers(dShemaPer)
                        }
                        await pSchema.save()
                    }             
                    await db.desconectarBD()
                }         
                grabarBD()
                break
            case 4:
                console.log("\nHA ENTRADO EN OPCIÓN 4")
                await db.conectarBD()
                let deseado: string | any;
                deseado =  await leerTeclado('\nTeclee 1 para recuperar VEHÍCULO o 2 para recuperar CONDUCTOR')
                if (deseado == 1)
                {
                console.log(`\nHa elegido recuperar VEHÍCULO`)
                let tmpAuto: Automovil | any
                placa_mat = await leerTeclado('\nIntroduzca la matrícula del vehículo')
                //let query: any = await Autos.find({})
                //await automoviles.findOne( 
                let query: any = await Autos.findOne( //usamos findOne, ya que la matrícula es única
                    { _placa_mat: placa_mat }) 
                           
                .then((doc: any) => {
                    console.log('\nCargando....') 
                    if (doc == null) console.log('\nNo existe')
                    else {
                        console.log('\nExiste: '+ doc)
                        tmpAuto = 
                            new Automovil(placa_mat, precioBase, potenciaMotor)
                    }
                })
            }else{
                console.log(`\nHa elegido recuperar CONDUCTOR para vehículo concreto`)
                let tmpPers: Personal | any
                MatAutoConducido  = await leerTeclado('\nIntroduzca la matrícula del vehículo cuyos conductores desea saber')
                let query: any = await Pers.find( //usamos find (y no findOne) porque las colecciones están unidas 1N
                    { _MatAutoConducido: MatAutoConducido }) 
                           
                .then((doc: any) => {
                    console.log('\nCargando...') 
                    if (doc == null) console.log('\nNo existe')
                    else {
                        console.log('\nExiste: '+ doc)
                        tmpPers = 
                            new Personal (DNI, nombre, sueldo, MatAutoConducido, PermisoConducir, fechaConducido)
                           
                    }
                })
    
                .catch( (err: any) => console.log('Error: '+err)) // concatenando con cadena muestra mensaje    
                await db.desconectarBD()
            }
                break
            case 5:
                console.log("\nHA ENTRADO EN OPCIÓN 5, ASIGNACIÓN DE UN VEHÍCULO A CONDUCTOR")
                             //   try{
                  //  let asignar = async () =>{
                    let dAutomovil: tAutomovil2
                    let tmpAuto: Automovil = new Automovil("", 0, 0)
                    let tmpPersonal: Personal
                    //let query2: any
                    await db.conectarBD()

                    //let v1  = await leerTeclado('dato')
                    //console.log("placaqqq: "+v1)
                    // Leemos un automovil concreto
                    //await leerTeclado('dato')
                    placa_mat  = await leerTeclado('\nIntroduzca Matrícula de vehículo para asignar a conductores')
                    //console.log("placa: "+placa_mat)
                    let query4: any =  await Autos.findOne( {_placa_mat: placa_mat} )
                    dAutomovil = query4
                  
                    // Montamos el objeto para el automovil
                  
                    if (dAutomovil._tipoObjeto == "A"){
                      tmpAuto = new Automovil(dAutomovil._placa_mat, dAutomovil._precioBase,dAutomovil._potenciaMotor)
                    }else{
                      tmpAuto = new TodoTerreno(
                          dAutomovil._placa_mat, 
                          dAutomovil._precioBase,
                          dAutomovil._potenciaMotor, 
                          dAutomovil._traccion)
                    }
                  
                    // Leemos las personas concretas, montamos los objetos con la nueva matrícula
                    // y asignamos las personas al automovil

                     
                    //const borrar = async (empleados: Array<Personal>) =>  {
                    let v = await leerTeclado('\nCantidad de conductores que quiere asignar a un vehiculo')
                    let registro: number = parseInt(v);
                    //let tmpPersonal2 = Array<Personal>()
                    //let personales2 = tmpPersonal2.sacaPersonas()
                    for(let i = 0; i < registro; i ++){ 
                        DNI  = await leerTeclado('\nIntroduzca DNI del conductor para asignar a dicha matrícula de vehículo')  
                        let query3: any = await Pers.findOne( {_DNI: DNI} )                        
                        if (query3._tipoObjeto == "ESP"){
                            tmpPersonal = new Personal(query3._DNI,query3._nombre, query3._sueldo, 
                                dAutomovil._placa_mat, query3._PermisoConducir, query3._fechaConducido)  
                        }else {
                            tmpPersonal = new Personal_extranjero(query3._DNI,query3._nombre, query3._sueldo, 
                                dAutomovil._placa_mat, query3._idioma, query3._PermisoConducir, query3._fechaConducido)
                        }
                      
                        tmpAuto.addPersona(tmpPersonal)    
      }
  
                   // Una vez montado el objeto automovil con sus personas hacemos persistenes los cambios en la BD:
                    // en este caso la actualización de la matrícula
                  
                   // Antes podemos usar cualquiera de sus métodos:
                  
                    //console.log("Precio: "+tmpAuto.precio())
                    //console.log("Sueldo Total: "+tmpAuto.sueldoTotal())
                  
                    let personales2 = tmpAuto.getPersonas()
                    for (let personal of personales2){
                  
                        // Controlamos el error de validación
                        // Recordar que hay que poner la opción useFindAndModify: false
                        await Pers.findOneAndUpdate( 
                          { _DNI: personal.DNI }, 
                          {
                              _MatAutoConducido: personal.MatAutoConducido,
                          },
                          {
                              runValidators: true // para que se ejecuten las validaciones del Schema
                          }  
                      )                
                      .then(() => console.log('Modificado Correctamente') )
                      .catch( (err: any) => console.log('Error: '+err)) // concatenando con cadena muestra mensaje
                    }
                    await db.desconectarBD() 
                    console.log("\nEL CAMBIO DE ASIGNACIÓN DE VEHÍCULO SE HA REALIZADO CON ÉXITO")
             //     }
               //   asignar()
                  /*
            }catch (e){
                console.log("\nNo ha entrado en la opción 6: " + e)                    
            }
            */
                break
            case 6:
                console.log("\nHA ENTRADO EN OPCIÓN 6, CALCULO DEL PRECIO FINAL DE TODOS VEHÍCULOS ")
                let precioFinal = async () => {
                    await db.conectarBD()
                    let tmpAuto: Automovil | any
                    let dAuto: iCarga
                    let query: any = await Autos.find({})
                    for (dAuto of query) {
                      if (dAuto._tipoObjeto == "T") {
                        tmpAuto = new TodoTerreno(dAuto._placa_mat, dAuto._precioBase, dAuto._potenciaMotor, dAuto._traccion)
                      } else if (dAuto._tipoObjeto == "A") {
                        tmpAuto = new Automovil(dAuto._placa_mat, dAuto._precioBase, dAuto._potenciaMotor)
                      }
                      console.log(`\n${tmpAuto.completo()} precio final:${tmpAuto.precio()}`)
                    }
                    await db.desconectarBD()
                  }
                  await precioFinal()
                break
            case 7:
                console.log("\nHA ENTRADO EN OPCIÓN 7, LISTA DE TODOS LOS CONDUCTORES")
                let conductores = async () => {
                    await db.conectarBD()
                    let tmpPers: Personal | any
                    let dPer: iPersonal2
                    let query: any = await Pers.find({})
                    for (dPer of query) {
                      if (dPer._tipoNacionalidad == "EXT") {
                        tmpPers = new Personal_extranjero(
                            dPer._DNI, dPer._nombre, 
                            dPer._sueldo, 
                            dPer._MatAutoConducido,
                            dPer._PermisoConducir, 
                            dPer._idioma,
                            dPer._fechaConducido 
                            )
                      } else if (dPer._tipoNacionalidad == "ESP") {
                        tmpPers = new Personal(
                            dPer._DNI, 
                            dPer._nombre, 
                            dPer._sueldo, 
                            dPer._MatAutoConducido, 
                            dPer._PermisoConducir,
                            dPer._fechaConducido )
                      }
                      console.log(`\n${tmpPers.todo()}`)
                    }
                    await db.desconectarBD()
                  }
                  await conductores()
                break
            case 8:
                console.log("\nHA ENTRADO EN OPCIÓN 8, BORRAR datos")
                let decidido: string | any;
                decidido =  await leerTeclado('\nTeclee 1 para borrar CONDUCTORES o 2 para borrar VEHÍCULOS')
                if (decidido == 1)
                {
                console.log(`\nHa elegido BORRAR un CONDUCTOR`)
		        await db.conectarBD()
                let tmpPers2: Personal | any
                DNI  = await leerTeclado('\nIntroduzca DNI del conductor que desea borrar')
                let query2: any = await Pers.findOneAndDelete( 
                    { _DNI: DNI }) 
                           
                .then((doc: any) => {
                    console.log('\nLa operación de BORRADO se realizó correctamente') 
                    if (doc == null) console.log('\nNo existe')
                    else {
                        console.log('\nBORRADA toda la información de abajo: '+ doc)
                        tmpPers2 = 
                            new Personal (DNI, nombre, sueldo, MatAutoConducido, PermisoConducir, fechaConducido)
                    }
                })
                .catch( (err: any) => console.log('Error: '+err)) // concatenando con cadena muestra mensaje
                await db.desconectarBD()
                }else{
                console.log(`\nHa elegido BORRAR un VEHÍCULO`)
		        await db.conectarBD()
                let tmpAuto2: Automovil | any
                placa_mat  = await leerTeclado('\nIntroduzca MATRÍCULA del vehículo que desea borrar')
                let query2: any = await Autos.findOneAndDelete( 
                    { _placa_mat: placa_mat }) 
                           
                .then((doc: any) => {
                    console.log('\nLa operación de BORRADO se realizó correctamente') 
                    if (doc == null) console.log('\nNo existe')
                    else {
                        console.log('\nBORRADA toda la información de abajo: '+ doc)
                        tmpAuto2 = 
                            new Automovil(placa_mat, precioBase, potenciaMotor)
                    }
                })
                .catch( (err: any) => console.log('Error: '+err)) // concatenando con cadena muestra mensaje
                await db.desconectarBD()
            	}
                break
            case 9:
                console.log("\nHA ENTRADO EN OPCIÓN 9, CALCULO DE TODOS LOS SUELDOS POR AUTOMOVIL")
                /*let sueldoAuto = async () => {
                    await db.conectarBD()
                    let tmpTaxi: Automovil | any
                    let dPersonal: iPersonal2
                    let dAuto: iCarga
                    let queryPer: any = await Pers.find({})
                    let queryAuto: any = await Autos.find({})
                    
                    for (dAuto of queryAuto) {
                      tmpTaxi = new Automovil(dAuto._placa_mat, dAuto._precioBase, dAuto._potenciaMotor)
                      let gasto: number = 0
                      for (dPersonal of queryPer) {
                        if (dPersonal._MatAutoConducido == dAuto._placa_mat) {
                          gasto = gasto + dPersonal._sueldo
                        }
                      }
                      //console.log(gasto)
                      console.log(`\n${tmpTaxi.abreviado()} coste en sueldos total:${gasto}`)
                    }

                  
                    await db.desconectarBD()
                  }
    
                  await sueldoAuto()*/   
                  let sueldoAuto = async () => {
                    await db.conectarBD()
                    let dAutomovil: tAutomovil2
                    let tmpAutos: Automovil = new Automovil("", 0, 0)
                    let tmpPersona: Personal
                    let query: any =  await Autos.find( {} )
                    let sueldoTA
                   
                    for (dAutomovil of query){
                      //console.log(dAutomovil._matricula)
                      sueldoTA = 0
                  
                      if (dAutomovil._tipoObjeto == "A"){
                        //console.log(dAutomovil._placa_mat)
                  
                        tmpAutos = new Automovil(
                            dAutomovil._placa_mat, 
                            dAutomovil._precioBase, 
                            dAutomovil._potenciaMotor)
                        }else {
                            tmpAutos = new TodoTerreno(
                            dAutomovil._placa_mat, 
                            dAutomovil._precioBase, 
                            dAutomovil._potenciaMotor,
                            dAutomovil._traccion)     
                          }
                  
                        let query2: any = await Pers.find( {_MatAutoConducido: dAutomovil._placa_mat} )
                  
                        for (let dPersona of query2){
                          //console.log("persona"+dPersona._MatAutoConducido)
                  
                          if (dPersona._tipoObjeto == "ESP"){
                            tmpPersona = new Personal(
                                dPersona._DNI, 
                                dPersona._nombre,  
                                dPersona._sueldo, 
                                dPersona._MatAutoConducido, 
                                dPersona._PermisoConducir,
                                dPersona._fechaConducido
                                )  
                          }else {
                            tmpPersona = new Personal_extranjero(
                                dPersona._DNI, 
                                dPersona._nombre,  
                                dPersona._sueldo, 
                                dPersona._MatAutoConducido, 
                                dPersona._idioma, 
                                dPersona._PermisoConducir,
                                dPersona._fechaConducido) 
                          }
                  
                          //console.log(tmpPersona.calcularSueldo())
                          sueldoTA += tmpPersona.calcularSueldo()
                          tmpAutos.addPersona(tmpPersona)
                          //console.log(tmpAutos.getPersonas())
                      }
                      // Otra forma. Pidiendo el valor al método de la clase. NO se calcula fuera de la clase
                      //Aquí se usan 2 métodos (de dentro de la clase) a la vez
                      console.log(tmpAutos.abreviado()+'Suma total de sueldos de conductores de vehículo concreto: '+tmpAutos.sueldoTotal())
                    } 
                    //console.log(sueldoTA)
                    // Otra forma. Pidiendo el valor al método de la clase
                    //console.log(tmpAutos.sueldoTotal())
                    //console.log("Precio: "+tmpAuto.precio())    
                    await db.desconectarBD()                
                  }
                  
                  await sueldoAuto()                         
                break
            case 10:
                console.log("\nHA ENTRADO EN OPCIÓN 10, CALCULAR EL COSTE ANUAL POR VEHÍCULO")
  
                  let sueldoAnual = async () => {
                    const anualidad_raw =  await leerTeclado('\nFecha desde la que se calculan sueldos totales (formato: AAAA-MM-DD)')
                    const anualidad = new Date(anualidad_raw).toISOString() //conversión formato fecha
                    //console.log("Lo que sale de anualidad_RAW, directamente de teclado: "+anualidad_raw)
                    //console.log("Lo que sale de aplicar a lo anterior new Date, convirtiendose en ANUALIDAD: "+anualidad)
                    //let query7: any = await Pers.find( {_fechaConducido: anualidad}
                    //console.log(fechaConducido)
                    await db.conectarBD()
                    let dAutomovil: tAutomovil2
                    let tmpAutos: Automovil = new Automovil("", 0, 0)
                    let tmpPersona: Personal
                    let query: any =  await Autos.find( {} )
                    let sueldoTA
                   
                    for (dAutomovil of query){
                      //console.log(dAutomovil._matricula)
                      sueldoTA = 0
                  
                      if (dAutomovil._tipoObjeto == "A"){
                        //console.log(dAutomovil._placa_mat)
                  
                        tmpAutos = new Automovil(
                            dAutomovil._placa_mat, 
                            dAutomovil._precioBase, 
                            dAutomovil._potenciaMotor)
                        }else {
                            tmpAutos = new TodoTerreno(
                            dAutomovil._placa_mat, 
                            dAutomovil._precioBase, 
                            dAutomovil._potenciaMotor,
                            dAutomovil._traccion)     
                          }
                  
                        //let query2: any = await Pers.find( {_fechaConducido: {$year: 2020 }}, {_MatAutoConducido: dAutomovil._placa_mat} )
                        //db.inventario.find( { cantidad: { $gte: 50 }, estado: { $eq: "obsoleto" } } )
                        //let query7: any = await Pers.find( {}
                        //let fechaConducido: Date = new Date(anualidad)
                        //console.log("Lo que se esconde tras ANUALIDAD, ANTES: "+anualidad)
                        let fechaConducido = anualidad
                        //console.log("Lo que se esconde tras ANUALIDAD, DESPUES: "+anualidad)
                        //let date: Date = new Date(anualidad)
                        //console.log("Lo que sale de aplicar otro new Date a ANUALIDAD: "+date)
                        //console.log("Lo que sale de aplicarle a lo anterior el getFullYear: "+date.getFullYear())
                        let query2: any = await Pers.find( {_fechaConducido: {$gte: fechaConducido}}/*, {_MatAutoConducido: dAutomovil._placa_mat}*/  )
                        //let query2: any = await Pers.find( {_fechaConducido:{$gte:("2021-01-01T00:00:00.000Z")}}/*, {_MatAutoConducido: dAutomovil._placa_mat}*/  )
                        //let query2: any = await Pers.find({_fechaConducido: fechaConducido.getFullYear("2021")}/*, {_MatAutoConducido: dAutomovil._placa_mat}*/  )
                        //console.log(fechaConducido)
                        //console.log(query2)
                        for (let dPersona of query2){
                          //console.log("persona"+dPersona._MatAutoConducido)
                  
                          if (dPersona._tipoObjeto == "ESP"){
                            tmpPersona = new Personal(
                                dPersona._DNI, 
                                dPersona._nombre,  
                                dPersona._sueldo, 
                                dPersona._MatAutoConducido, 
                                dPersona._PermisoConducir,
                                dPersona._fechaConducido
                                )  
                          }else {
                            tmpPersona = new Personal_extranjero(
                                dPersona._DNI, 
                                dPersona._nombre,  
                                dPersona._sueldo, 
                                dPersona._MatAutoConducido, 
                                dPersona._idioma, 
                                dPersona._PermisoConducir,
                                dPersona._fechaConducido) 
                          }
                  
                          //console.log(tmpPersona.calcularSueldo())
                          sueldoTA += tmpPersona.calcularSueldo()
                          tmpAutos.addPersona(tmpPersona)
                          //console.log(tmpAutos.getPersonas())
                      }
                      
                    } 
                    // Otra forma. Pidiendo el valor al método de la clase. NO se calcula fuera de la clase
                    //Aquí se usan 2 métodos (de dentro de la clase) a la vez
                    console.log('\nCoste total sumando sueldos de conductores (desde la fecha indicada): '+tmpAutos.sueldoTotal())
                    //console.log(sueldoTA)
                    // Otra forma. Pidiendo el valor al método de la clase
                    //console.log(tmpAutos.sueldoTotal())
                    //console.log("Precio: "+tmpAuto.precio())    
                    await db.desconectarBD()                
                  }
                  
                  await sueldoAnual()                                                        
                break

            case 100:
                console.log('\n--HA SALIDO CON ÉXITO, ADIÓS--')
                break
            default:
                console.log("\nLO SENTIMOS, OPCIÓN INCORRECTA")
                break
        }
    }while (n != 100)
}

const setBD = async (local: boolean) => {
    
    const bdLocal = 'empresa'

    const conexionLocal = `mongodb://localhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'empresa'
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas =          
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.a5pu9.mongodb.net/${bdAtlas}?retryWrites=true&w=majority` 
        db.cadenaConexion = conexionAtlas
    }
}

main()