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
apiEventoRouter.post('/evento', evento)
apiEventoRouter.post('/eventos', eventos)
apiEventoRouter.post('/eventos/insert', crear)
apiEventoRouter.post('/eventos/update', modificar)
apiEventoRouter.post('/eventos/delete', borrar)

export default apiEventoRouter
