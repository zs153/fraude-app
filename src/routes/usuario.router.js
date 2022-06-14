import express from 'express'
import {verifyTokenAndResp} from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  perfilPage,
  insert,
  update,
  remove,
  changePassword,
  updatePerfil,
} from '../controllers/usuario.controller'

const usuarioRouter = express.Router()

// pages
usuarioRouter.get('/usuarios', verifyTokenAndResp, mainPage)
usuarioRouter.get('/usuarios/add', verifyTokenAndResp, addPage)
usuarioRouter.get('/usuarios/edit/:id', verifyTokenAndResp, editPage)
usuarioRouter.get('/usuarios/perfil/:id', verifyTokenAndResp, perfilPage)

// procedures
usuarioRouter.post('/usuarios/insert', verifyTokenAndResp, insert)
usuarioRouter.post('/usuarios/update', verifyTokenAndResp, update)
usuarioRouter.post('/usuarios/delete', verifyTokenAndResp, remove)
usuarioRouter.post('/usuarios/change', verifyTokenAndResp, changePassword)
usuarioRouter.post('/usuarios/perfil', verifyTokenAndResp, updatePerfil)

export default usuarioRouter
