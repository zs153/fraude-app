import express from 'express'
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  mainPage,
  addPage,
  insert,
} from '../controllers/carga.controller'

const cargaRouter = express.Router()

// paginas
cargaRouter.get('/cargas', verifyTokenAndAdmin, mainPage)
cargaRouter.get('/cargas/add', verifyTokenAndAdmin, addPage)

// procedures
cargaRouter.post('/cargas/insert', verifyTokenAndAdmin, insert)

export default cargaRouter