import express from 'express'
import {
  fraude,
  fraudes,
  asignar,
  crear,
  modificar,
  borrar,
  hitosFraude,
  crearHito,
  eventosFraude,
  crearEvento,
  estadisticasHitos,
  estadisticasOficinas,
  estadisticasSituacion,
  estadisticasActuacion,
  cierre,
  desasignar,
  crearHitoLiquidacion,
  crearHitoSancion,
  borrarHito,
  borrarEvento,
  smss,
  crearSms,
  modificarSms,
  borrarSms,
  relaciones,
  crearRelacion,
  modificarRelacion,
  borrarRelacion,
} from '../controllers/fraude.controller'

const apiFraudeRouter = express.Router()

// fraudes
apiFraudeRouter.post('/fraude', fraude)
apiFraudeRouter.post('/fraudes', fraudes)
apiFraudeRouter.post('/fraudes/insert', crear)
apiFraudeRouter.post('/fraudes/update', modificar)
apiFraudeRouter.post('/fraudes/delete', borrar)
apiFraudeRouter.post('/fraudes/asign', asignar)
apiFraudeRouter.post('/fraudes/unasign', desasignar)
apiFraudeRouter.post('/fraudes/cierre', cierre)

// estadistica
apiFraudeRouter.post('/fraudes/stat/hitos', estadisticasHitos)
apiFraudeRouter.post('/fraudes/stat/oficinas', estadisticasOficinas)
apiFraudeRouter.post('/fraudes/stat/situacion', estadisticasSituacion)
apiFraudeRouter.post('/fraudes/stat/actuacion', estadisticasActuacion)

//hitos
apiFraudeRouter.post('/fraudes/hitos', hitosFraude)
apiFraudeRouter.post('/fraudes/hitos/insert', crearHito)
apiFraudeRouter.post('/fraudes/hitos/insertliq', crearHitoLiquidacion)
apiFraudeRouter.post('/fraudes/hitos/insertsan', crearHitoSancion)
apiFraudeRouter.post('/fraudes/hitos/delete', borrarHito)

//eventos
apiFraudeRouter.post('/fraudes/eventos', eventosFraude)
apiFraudeRouter.post('/fraudes/eventos/insert', crearEvento)
apiFraudeRouter.post('/fraudes/eventos/delete', borrarEvento)

// sms
apiFraudeRouter.post('/fraudes/smss', smss)
apiFraudeRouter.post('/fraudes/smss/insert', crearSms)
apiFraudeRouter.post('/fraudes/smss/update', modificarSms)
apiFraudeRouter.post('/fraudes/smss/delete', borrarSms)

// relacionados
apiFraudeRouter.post('/fraudes/relaciones', relaciones)
apiFraudeRouter.post('/fraudes/relaciones/insert', crearRelacion)
apiFraudeRouter.post('/fraudes/relaciones/update', modificarRelacion)
apiFraudeRouter.post('/fraudes/relaciones/delete', borrarRelacion)

export default apiFraudeRouter