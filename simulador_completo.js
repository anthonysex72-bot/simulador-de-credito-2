
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;


  function ocultarSecciones() {
    let secciones = document.getElementsByTagName("section");

    for (let i = 0; i < secciones.length; i++) {
        secciones[i].classList.remove("activa");
    }
}
  
function mostrarSeccion(id) {
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
    let tasa = recuperarFloat("tasaInteres");

    if (tasa >= 10 && tasa <= 20) {
        tasaInteres = tasa;
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");
    } else {
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
}

function guardarCliente() {
    let cedula = recuperaraTexto("cedula");
    let nombre = recuperaraTexto("nombre");
    let apellido = recuperaraTexto("apellido");
    let ingresos = recuperarFloat("ingresos");
    let egresos = recuperarFloat("egresos");

    let cliente = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        ingresos: ingresos,
        egresos: egresos
    };

    if (clienteSeleccionado == null) {
    clientes.push(cliente);
    } else {
    clienteSeleccionado.nombre = nombre;
    clienteSeleccionado.apellido = apellido;
    clienteSeleccionado.ingresos = ingresos;
    clienteSeleccionado.egresos = egresos;
    clienteSeleccionado = null;
    
}

pintarClientes();
}

function pintarClientes() {
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";

    for (let i = 0; i < clientes.length; i++) {
    let cliente = clientes[i];

    let fila = "<tr>";
    fila += "<td>" + cliente.cedula + "</td>";
    fila += "<td>" + cliente.nombre + "</td>";
    fila += "<td>" + cliente.apellido + "</td>";
    fila += "<td>" + cliente.ingresos + "</td>";
    fila += "<td>" + cliente.egresos + "</td>";
    fila += "<td><button onclick=\"seleccionarCliente('" + cliente.cedula + "')\">Actualizar</button></td>";
    fila += "</tr>";

    tabla.innerHTML += fila;
    }
    
}

function buscarCliente(cedula) {
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula == cedula) {
            return clientes[i];
        }
    }

    return null;
}

function buscarClienteCredito() {
    let cedula = recuperaraTexto("buscarCedulaCredito");
    let cliente = buscarCliente(cedula);

    if (cliente != null) {
        clienteSeleccionado = cliente;
        let datos = `
            <h3>Datos del Cliente</h3>
            <p><strong>Cédula:</strong> ${cliente.cedula}</p>
            <p><strong>Nombre:</strong> ${cliente.nombre}</p>
            <p><strong>Apellido:</strong> ${cliente.apellido}</p>
            <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
            <p><strong>Egresos:</strong> ${cliente.egresos}</p>
        `;

        document.getElementById("datosClienteCredito").innerHTML = datos;
    } else {
      clienteSeleccionado = null;
        mostrarTexto("datosClienteCredito", "Cliente no encontrado");
    }
    
}

function calcularCredito() {
    if (clienteSeleccionado == null) {
    mostrarTexto("resultadoCredito", "Primero debes buscar un cliente");
    return;
    }     
    let monto = recuperarFloat("montoCredito");
    let plazo = recuperarFloat("plazoCredito");

    if (isNaN(monto) || monto <= 0 || isNaN(plazo) || plazo <= 0) {
    mostrarTexto("resultadoCredito", "Ingresa un monto y un plazo válidos");
    return;
}

    let ingresos = clienteSeleccionado.ingresos;
    let egresos = clienteSeleccionado.egresos;

    let disponible = calcularDisponible(ingresos, egresos);
    let capacidadPago = calcularCapacidadPago(disponible);
    let interes = calcularInteresSimple(monto, tasaInteres, plazo);
    let total = calcularTotalPagar(monto, interes);
    let cuota = calcularCuotaMensual(total, plazo);

    creditoAprobado = aprobarCredito(capacidadPago, cuota);

    let resultado = `
        Capacidad de pago: ${capacidadPago.toFixed(2)}<br>
        Total a pagar: ${total.toFixed(2)}<br>
        Cuota mensual: ${cuota.toFixed(2)}<br>
        RESULTADO: ${creditoAprobado ? "APROBADO" : "RECHAZADO"}
    `;

    document.getElementById("resultadoCredito").innerHTML = resultado;

    if (creditoAprobado) {
        document.getElementById("resultadoCredito").className = "aprobado";
    } else {
        document.getElementById("resultadoCredito").className = "rechazado";
    }
}

function seleccionarCliente(cedula) {
    let cliente = buscarCliente(cedula);

    if (cliente != null) {
        clienteSeleccionado = cliente;

        mostrarTextoEnCaja("cedula", cliente.cedula);
        mostrarTextoEnCaja("nombre", cliente.nombre);
        mostrarTextoEnCaja("apellido", cliente.apellido);
        mostrarTextoEnCaja("ingresos", cliente.ingresos);
        mostrarTextoEnCaja("egresos", cliente.egresos);
    }
}

function limpiar() {
    mostrarTextoEnCaja("cedula", "");
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos", "");

    clienteSeleccionado = null;
}
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios