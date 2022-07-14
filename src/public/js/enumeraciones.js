export const tiposMovimiento = {
  crearDocumento: 0,
  modificarDocumento: 1,
  borrarDocumento: 2,
  crearUsuario: 3,
  modificarUsuario: 4,
  borrarUsuario: 5,
  crearOficina: 6,
  modificarOficina: 7,
  borrarOficina: 8,
  crearTipoFormulario: 9,
  modificarTipoFormulario: 10,
  borrarTipoFormulario: 11,
  crearReferencia: 12,
  modificarReferencia: 13,
  borrarReferencia: 14,
  asignarFormulario: 15,
  resolverFormulario: 16,
  remitirFormulario: 17,
  desasignarFormulario: 18,
  crearSms: 19,
  modificarSms: 20,
  borrarSms: 21,
  actualizarPerfil: 22,
  crearFraude: 23,
  modificarFraude: 24,
  borrarFraude: 25,
  asignarFraude: 26,
  resolverFraude: 27,
  remitirFraude: 28,
  desasignarFraude: 29,
  crearHito: 30,
  modificarHito: 31,
  borrarHito: 32,
  crearSubtipo: 33,
  modificarSubtipo: 34,
  borrarSubtipo: 35,
  modificarPerfil: 36,
  asignarCita: 37,
  crearCita: 38,
  modificarCita: 39,
  borrarCita: 40,
  crearEvento: 41,
  modificarEvento: 42,
  borrarEvento: 43,
  crearTipoHito: 44,
  modificarTipoHito: 45,
  borrarTipoHito: 46,
  crearTipoEvento: 47,
  modificarTipoEvento: 48,
  borrarTipoEvento: 49,
  crearTipoFraude: 50,
  modificarTipoFraude: 51,
  borrarTipoFraude: 52,
  crearCarga: 53,
  modificiarCarga: 54,
  borrarCarga: 55,
  nuevoRelacionadoFraude: 57,
  nuevoEjercicioFraude: 58,
  archivadoSancion: 59,
  cambioPassword: 60,
  olvidoPassword: 61,
  restablecerPassword: 62,
  registroUsuario: 63,
}
export const tiposPerfil = {
  general: 1,
  informador: 3,
  liquidador: 8,
}
export const tiposRol = {
  usuario: 1,
  responsable: 2,
  admin: 3,
}
export const tiposVisualizacion = {
  todos: -1,
  pendientes: 1,
  resueltos: 2,
}
export const estadosUsuario = {
  reserva: 0,
  activo: 1,
}
export const estadosDocumento = {
  pendiente: 0,
  asignado: 1,
  resuelto: 2,
  remitido: 3,
}
export const estadosFraude = {
  pendiente: 0,
  asignado: 1,
  resuelto: 2,
  remitido: 3,
}
export const estadosCita = {
  disponible: 0,
  asignado: 1,
}
export const estadosSms = {
  pendiente: 0,
  enviado: 1,
}
export const estadosHito = {
  sancionAnulada: -1,
  propuestaLiquidacion: 1,
  liquidacion: 2,
  propuestaSancion: 3,
  sancion: 4,
}
export const tiposLiquidacion = {
  ingresar: 1,
  devolver: 2,
}
export const estadosCarga = {
  pendiente: 0,
  procesado: 1,
}

/* arrays */
export const arrTiposRol = [
  { id: 0, des: 'INDEFINIDO' },
  { id: 1, des: 'USUARIO' },
  { id: 2, des: 'RESPONSABLE' },
  { id: 3, des: 'ADMINISTRADOR' },
]
export const arrTiposPerfil = [
  { id: 1, des: 'GENERAL' },
  { id: 3, des: 'INFORMADOR' },
  { id: 8, des: 'LIQUIDADOR' },
]
export const arrEstadosUsuario = [
  { id: 0, des: 'RESERVA' },
  { id: 1, des: 'ACTIVO' },
]
export const arrEstadosSms = [
  { id: 0, des: 'PENDIENTE' },
  { id: 1, des: 'ENVIADO' },
]
export const arrEstadosFormulario = [
  { ID: 0, DES: 'PENDIENTE', LIT: 'PEN' },
  { ID: 1, DES: 'ASIGNADO', LIT: 'ASI' },
  { ID: 2, DES: 'RESUELTO', LIT: 'RES' },
  { ID: 3, DES: 'REMITIDO', LIT: 'REM' },
]
export const arrEstadosFraude = [
  { ID: 0, DES: 'PENDIENTE', LIT: 'PEN' },
  { ID: 1, DES: 'ASIGNADO', LIT: 'ASI' },
  { ID: 2, DES: 'RESUELTO', LIT: 'RES' },
  { ID: 3, DES: 'REMITIDO', LIT: 'REM' },
]
export const arrTiposLiquidacion = [
  { id: 1, des: 'INFRESAR' },
  { id: 2, des: 'DEVOLVER' },
]
