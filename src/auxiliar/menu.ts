import { leerTeclado } from './lecturaTeclado'

export const menu_AAD = async () => {
    let n: number
    console.log('\n')
    console.log('0.- Establecer conexión a BD (ATLAS en nube vs LOCAL)')
    console.log('1.- CREAR un NUEVO Vehículo')
    console.log('2.- CREAR una NUEVA Persona')
    console.log('3.- GUARDAR lo creado en BD')
    console.log('4.- RECUPERAR (a memoria) documentos de la BD')
    console.log('5.- ASIGNACIÓN MÚLTIPLE DE UN VEHÍCULO A VARIOS CONDUCTORES')
    console.log('6.- Calcular los PRECIOS FINALES de todos los vehículos')
    console.log('7.- LISTA DE TODOS LOS CONDUCTORES')
    console.log('8.- BORRAR de la BD')
    console.log('9.- CALCULAR SUMA DE TODOS LOS SUELDOS ASOCIADOS A CADA AUTOMOVIL ')
    console.log('10.- CALCULAR EL COSTE TOTAL EN SUELDOS DE LA FLOTA, DESDE FECHA DADA')    
    console.log('100.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

