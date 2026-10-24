//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO

function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;

    if (disponible < 0) {
        return 0;
    }

    return disponible;

    
}

function calcularCapacidadPago(montoDisponible) {
    let monto=montoDisponible/2;
    return monto;
}

function calcularInteresSimple(monto,tasa,plazoAnios ) {
    let interes = plazoAnios * monto * (tasa / 100);

    return interes;
}

function calcularTotalPagar(monto,interes){
    let total=monto+interes+100;
    return total;
}

function calcularCuotaMensual(total,plazoAnios){
    let cuotaMensual = total / (plazoAnios* 12);
    return cuotaMensual;
}

function aprobarCredito(capacidadPago, cuotaMensual) {
    if (capacidadPago > cuotaMensual) {
    return true;
    } else {
    return false}
    


}