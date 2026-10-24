
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

    clientes.push(cliente);
}

function pintarClientes() {
    let tabla = document.getElementById("tablaClientes");
    tabla.innerHTML = "";

    for (let i = 0; i < clientes.length; i++) {
        let cliente = clientes[i];

        tabla.innerHTML += "<tr>";
        tabla.innerHTML += "<td>" + cliente.cedula + "</td>";
        tabla.innerHTML += "<td>" + cliente.nombre + "</td>";
        tabla.innerHTML += "<td>" + cliente.apellido + "</td>";
        tabla.innerHTML += "<td>" + cliente.ingresos + "</td>";
        tabla.innerHTML += "<td>" + cliente.egresos + "</td>";
        tabla.innerHTML += "<td><button onclick=\"seleccionarCliente('" + cliente.cedula + "')\">Actualizar</button></td>";
        tabla.innerHTML += "</tr>";
    }
}
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios