import express from 'express'
import {
  fraude,
  fraudes,
  extended,
  asignarFraude,
  crearFraude,
  modificarFraude,
  borrarFraude,
  desasignarFraude,
  cierreFraude,
  hito,
  hitos,
  crearHito,
  modificarHito,
  borrarHito,
  crearHitoLiquidacion,
  crearHitoSancion,
  cambioEstadoHito,
  evento,
  eventos,
  crearEvento,
  modificarEvento,
  borrarEvento,
  sms,
  smss,
  crearSms,
  modificarSms,
  borrarSms,
  relacion,
  relaciones,
  crearRelacion,
  modificarRelacion,
  borrarRelacion,
} from '../controllers/fraude.controller'

const apiFraudeRouter = express.Router()

// fraudes
apiFraudeRouter.post('/fraude', fraude)
apiFraudeRouter.post('/fraudes', fraudes)
apiFraudeRouter.post('/fraudes/extended', extended)
apiFraudeRouter.post('/fraudes/insert', crearFraude)
apiFraudeRouter.post('/fraudes/update', modificarFraude)
apiFraudeRouter.post('/fraudes/delete', borrarFraude)
apiFraudeRouter.post('/fraudes/asign', asignarFraude)
apiFraudeRouter.post('/fraudes/unasign', desasignarFraude)
apiFraudeRouter.post('/fraudes/cierre', cierreFraude)

//hitos
apiFraudeRouter.post('/fraudes/hito', hito)
apiFraudeRouter.post('/fraudes/hitos', hitos)
apiFraudeRouter.post('/fraudes/hitos/insert', crearHito)
apiFraudeRouter.post('/fraudes/hitos/update', modificarHito)
apiFraudeRouter.post('/fraudes/hitos/delete', borrarHito)
apiFraudeRouter.post('/fraudes/hitos/insertliq', crearHitoLiquidacion)
apiFraudeRouter.post('/fraudes/hitos/insertsan', crearHitoSancion)
apiFraudeRouter.post('/fraudes/hitos/archivado', cambioEstadoHito)

//eventos
apiFraudeRouter.post('/fraudes/evento', evento)
apiFraudeRouter.post('/fraudes/eventos', eventos)
apiFraudeRouter.post('/fraudes/eventos/insert', crearEvento)
apiFraudeRouter.post('/fraudes/eventos/update', modificarEvento)
apiFraudeRouter.post('/fraudes/eventos/delete', borrarEvento)

// sms
apiFraudeRouter.post('/fraudes/sms', sms)
apiFraudeRouter.post('/fraudes/smss', smss)
apiFraudeRouter.post('/fraudes/smss/insert', crearSms)
apiFraudeRouter.post('/fraudes/smss/update', modificarSms)
apiFraudeRouter.post('/fraudes/smss/delete', borrarSms)

// relacionados
apiFraudeRouter.post('/fraudes/relacion', relacion)
apiFraudeRouter.post('/fraudes/relaciones', relaciones)
apiFraudeRouter.post('/fraudes/relaciones/insert', crearRelacion)
apiFraudeRouter.post('/fraudes/relaciones/update', modificarRelacion)
apiFraudeRouter.post('/fraudes/relaciones/delete', borrarRelacion)

export default apiFraudeRouter