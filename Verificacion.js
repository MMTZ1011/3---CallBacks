
const usuariosDB = {
  ana: { 
    activa: true, 
    permisos: true },
  luis: { 
    activa: false, 
    permisos: false }

};

function verificarUsuario(usuario, callback) {
  setTimeout(() => {
     // Tu código
     const existe = usuariosDB.hasOwnProperty(usuario);
     callback(existe)//lo returnea con esta función de callback
  }, 1000);
}

function comprobarCuentaActiva(usuario, callback) {
  setTimeout(() => {
    // Simulamos que todas las cuentas excepto "luis" están activas
    let cuentaActiva;
    if (usuariosDB[usuario] && usuariosDB[usuario].activa) { // si tiene propiedad de activa
      cuentaActiva = true; 
    }else {
        cuentaActiva = false; 
    }

    callback(cuentaActiva);
  }, 1000);
}

function verificarPermisos(usuario, callback) {
  setTimeout(() => {
    // Simulamos que solo "ana" tiene permisos
    let tienePermisos;
    if (usuariosDB[usuario] && usuariosDB[usuario].permisos) {
      tienePermisos = true; // Tiene permisos
    } else {
      tienePermisos = false; // No tiene permisos
    }
    callback(tienePermisos)
  }, 1000);
}

// Orquestación de las verificaciones
function procesoDeVerificacion(usuario) {
  console.log(`${usuario} | ⏳ | Iniciando verificación para el usuario `);
  
  verificarUsuario(usuario, (existe) => {
    if (!existe) {
      return console.log(`${usuario} | 👤 | El usuario NO existe. ❌`);
    }
    console.log(`${usuario} | 👤 | Usuario verificado exitosamente. ✔️`);
    
    comprobarCuentaActiva(usuario, (activa) => {
      if (!activa) {
        return console.log(`${usuario} | 💳 | La cuenta del usuario NO está activa. ❌`);
      }
      console.log(`${usuario} | 💳 |La cuenta del usuario está activa. ✔️`);
      
      verificarPermisos(usuario, (permisos) => {
        if (!permisos) {
          return console.log(`${usuario} | 🔑 | El usuario NO tiene permisos.❌`);
        }
        console.log(`${usuario} | 🔑 | El usuario TIENE permisos. Acceso concedido. ✔️`);
      });
    });
  });
}

// Ejecución de la función con diferentes usuarios
console.log("Iniciando proceso...")
procesoDeVerificacion('ana');   // Usuario con acceso completo
procesoDeVerificacion('luis');  // Usuario sin cuenta activa
procesoDeVerificacion('pedro'); // Usuario que no existe
