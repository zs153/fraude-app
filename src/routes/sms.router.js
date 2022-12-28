import express from 'express'
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  insertSms,
  updateSms,
  deleteSms,
} from '../controllers/sms.controller'

const smsRouter = express.Router()

// paginas
smsRouter.get('/smss', verifyTokenAndAdmin, mainPage)
smsRouter.get('/smss/add', verifyTokenAndAdmin, addPage)
smsRouter.get('/smss/edit/:id', verifyTokenAndAdmin, editPage)

// procedures
smsRouter.post('/smss/insert', verifyTokenAndAdmin, insertSms)
smsRouter.post('/smss/update', verifyTokenAndAdmin, updateSms)
smsRouter.post('/smss/delete', verifyTokenAndAdmin, deleteSms)

export default smsRouter
