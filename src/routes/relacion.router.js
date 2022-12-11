import express from 'express'
import {
  relacion,
  relaciones,
  crear,
  modificar,
  borrar,
} from '../controllers/relacion.controller'

const apiRelacionRouter = express.Router()

// oficinas
apiRelacionRouter.post('/relacion', relacion)
apiRelacionRouter.post('/relaciones', relaciones)
apiRelacionRouter.post('/relaciones/insert', crear)
apiRelacionRouter.post('/relaciones/update', modificar)
apiRelacionRouter.post('/relaciones/delete', borrar)

export default apiRelacionRouter
