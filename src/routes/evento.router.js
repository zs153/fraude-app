import express from 'express'
import {
  evento,
  eventos,
  crear,
  modificar,
  borrar,
} from '../controllers/evento.controller'

const apiEventoRouter = express.Router()

// eventos
apiEventoRouter.post('/event', evento)
apiEventoRouter.post('/events', eventos)
apiEventoRouter.post('/events/insert', crear)
apiEventoRouter.post('/events/update', modificar)
apiEventoRouter.post('/events/delete', borrar)

export default apiEventoRouter
