import express from 'express'
import {
  fraude,
  fraudes,
  cambioEstado,
  crear,
  modificar,
  borrar,
  crearSms,
  hitosFraude,
  crearHito,
  eventosFraude,
  crearEvento,
  estadisticasHitos,
  estadisticasOficinas,
  estadisticasSituacion,
  estadisticasActuacion,
  cierre,
  unasign,
  crearHitoLiquidacion,
  crearHitoSancion,
} from '../controllers/fraude.controller'

const apiFraudeRouter = express.Router()

// fraudes
apiFraudeRouter.post('/fraude', fraude)
apiFraudeRouter.post('/fraudes', fraudes)
apiFraudeRouter.post('/fraudes/insert', crear)
apiFraudeRouter.post('/fraudes/update', modificar)
apiFraudeRouter.post('/fraudes/delete', borrar)
apiFraudeRouter.post('/fraudes/cambio', cambioEstado)
apiFraudeRouter.post('/fraudes/unasign', unasign)
apiFraudeRouter.post('/fraudes/cierre', cierre)
apiFraudeRouter.post('/fraudes/stat/hitos', estadisticasHitos)
apiFraudeRouter.post('/fraudes/stat/oficinas', estadisticasOficinas)
apiFraudeRouter.post('/fraudes/stat/situacion', estadisticasSituacion)
apiFraudeRouter.post('/fraudes/stat/actuacion', estadisticasActuacion)
apiFraudeRouter.post('/fraudes/sms/insert', crearSms)
//hitos
apiFraudeRouter.post('/fraudes/hitos', hitosFraude)
apiFraudeRouter.post('/fraudes/hitos/insert', crearHito)
apiFraudeRouter.post('/fraudes/hitos/insertliq', crearHitoLiquidacion)
apiFraudeRouter.post('/fraudes/hitos/insertsan', crearHitoSancion)
//eventos
apiFraudeRouter.post('/fraudes/events', eventosFraude)
apiFraudeRouter.post('/fraudes/events/insert', crearEvento)

export default apiFraudeRouter