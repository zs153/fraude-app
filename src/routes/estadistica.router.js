import express from 'express'
import {
  actuacion,
  contadores,
  oficinas,
  situacion,
} from '../controllers/estadistica.controller'

const apiEstadisticaRouter = express.Router()

apiEstadisticaRouter.post('/estadisticas/contadores', contadores)
apiEstadisticaRouter.post('/estadisticas/situacion', situacion)
apiEstadisticaRouter.post('/estadisticas/oficinas', oficinas)
apiEstadisticaRouter.post('/estadisticas/actuacion', actuacion)

export default apiEstadisticaRouter