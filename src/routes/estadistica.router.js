import express from 'express'
import {
  estadisticasOficinas,
  estadisticasSituacion,
  estadisticasActuacion,
} from '../controllers/estadistica.controller'

const apiEstadisticaRouter = express.Router()

apiEstadisticaRouter.post('/estadisticas/situacion', estadisticasSituacion)
apiEstadisticaRouter.post('/estadisticas/oficinas', estadisticasOficinas)
apiEstadisticaRouter.post('/estadisticas/actuacion', estadisticasActuacion)

export default apiEstadisticaRouter