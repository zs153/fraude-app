import express from 'express'
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insert,
  update,
  remove,
} from '../controllers/tipocierre.controller'

const tipoCierreRouter = express.Router()

// paginas
tipoCierreRouter.get('/tipos/cierres', verifyTokenAndAdmin, mainPage)
tipoCierreRouter.get('/tipos/cierres/add', verifyTokenAndAdmin, addPage)
tipoCierreRouter.get('/tipos/cierres/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
tipoCierreRouter.post('/tipos/cierres/insert', verifyTokenAndAdmin, insert)
tipoCierreRouter.post('/tipos/cierres/update', verifyTokenAndAdmin, update)
tipoCierreRouter.post('/tipos/cierres/delete', verifyTokenAndAdmin, remove)

export default tipoCierreRouter