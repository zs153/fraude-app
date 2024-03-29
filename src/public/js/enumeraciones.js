export const tiposMovimiento = {
  crearFraude: 1,
  modificarFraude: 2,
  borrarFraude: 3,
  crearUsuario: 4,
  modificarUsuario: 5,
  borrarUsuario: 6,
  crearOficina: 7,
  modificarOficina: 8,
  borrarOficina: 9,
  crearTipoFraude: 10,
  modificarTipoFraude: 11,
  borrarTipoFraude: 12,
  crearTipoHito: 13,
  modificarTipoHito: 14,
  borrarTipoHito: 15,
  crearTipoEvento: 16,
  modificarTipoEvento: 17,
  borrarTipoEvento: 18,
  crearRelacion: 19,
  modificarRelacion: 20,
  borrarRelacion: 21,
  crearHito: 22,
  modificarHito: 23,
  borrarHito: 24,
  crearEvento: 25,
  modificarEvento: 26,
  borrarEvento: 27,
  crearTipoCierre: 28,
  modificarTipoCierre: 29,
  borrarTipoCierre: 30,
  crearCarga: 31,
  modificarCarga: 32,
  borrarCarga: 33,
  crearSms: 34,
  modificarSms: 35,
  borrarSms: 36,
  asignarFraude: 37,
  desasignarFraude: 38,
  resolverFraude: 39,
  desharcerFraude: 40,
  crearEjercicio: 41,
  archivadoSancion: 42,
  cambioEstadoSms: 43,
  cambioPassword: 60,
  olvidoPassword: 61,
  restablecerPassword: 62,
  registroUsuario: 63,
  modificarPerfil: 65,
  modificarHistorico: 66,
  activarHistorico: 67,
  borrarHistorico: 68,
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
  activo: 1,
  reserva: 2,
}
export const estadosFraude = {
  pendiente: 0,
  asignado: 1,
  resuelto: 2,
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
export const arrEstadosHito = [
  { id: 1, des: 'PROPUESTA DE LIQUIDACION' },
  { id: 2, des: 'LIQUIDACION' },
  { id: 3, des: 'PROPUESTA DE SANCION' },
  { id: 4, des: 'SANCION' },
]
export const arrTiposRol = [
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
  { id: 1, des: 'ACTIVO' },
  { id: 2, des: 'RESERVA' },
]
export const arrEstadosSms = [
  { id: 0, des: 'PENDIENTE' },
  { id: 1, des: 'ENVIADO' },
]
export const arrEstadosFraude = [
  { ID: 0, DES: 'PENDIENTE', LIT: 'PEN' },
  { ID: 1, DES: 'ASIGNADO', LIT: 'ASI' },
  { ID: 2, DES: 'RESUELTO', LIT: 'RES' },
]
export const arrTiposLiquidacion = [
  { id: 1, des: 'INFRESAR' },
  { id: 2, des: 'DEVOLVER' },
]
