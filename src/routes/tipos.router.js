import express from 'express'
import { verifyTokenAndAdmin } from "../middleware/auth";
import { addCierrePage, addEventoPage, addFraudePage, addHitoPage, editCierrePage, editEventoPage, editFraudePage, editHitoPage, insertCierre, insertEvento, insertFraude, insertHito, mainCierresPage, mainEventosPage, mainFraudesPage, mainHitosPage, removeCierre, removeEvento, removeFraude, removeHito, updateCierre, updateEvento, updateFraude, updateHito } from '../controllers/admin/tipos.controller';

const tiposRouter = express.Router()

// paginas
// cierres
tiposRouter.get('/tipos/cierres', verifyTokenAndAdmin, mainCierresPage)
tiposRouter.get('/tipos/cierres/add', verifyTokenAndAdmin, addCierrePage)
tiposRouter.get('/tipos/cierres/edit/:id', verifyTokenAndAdmin, editCierrePage)
// eventos
tiposRouter.get('/tipos/eventos', verifyTokenAndAdmin, mainEventosPage)
tiposRouter.get('/tipos/eventos/add', verifyTokenAndAdmin, addEventoPage)
tiposRouter.get('/tipos/eventos/edit/:id', verifyTokenAndAdmin, editEventoPage)
// fraudes
tiposRouter.get('/tipos/fraudes', verifyTokenAndAdmin, mainFraudesPage)
tiposRouter.get('/tipos/fraudes/add', verifyTokenAndAdmin, addFraudePage)
tiposRouter.get('/tipos/fraudes/edit/:id', verifyTokenAndAdmin, editFraudePage)
// hitos
tiposRouter.get('/tipos/hitos', verifyTokenAndAdmin, mainHitosPage)
tiposRouter.get('/tipos/hitos/add', verifyTokenAndAdmin, addHitoPage)
tiposRouter.get('/tipos/hitos/edit/:id', verifyTokenAndAdmin, editHitoPage)

// procedures
// cierres
tiposRouter.post('/tipos/cierres/insert', verifyTokenAndAdmin, insertCierre)
tiposRouter.post('/tipos/cierres/update', verifyTokenAndAdmin, updateCierre)
tiposRouter.post('/tipos/cierres/delete', verifyTokenAndAdmin, removeCierre)
// eventos
tiposRouter.post('/tipos/eventos/insert', verifyTokenAndAdmin, insertEvento)
tiposRouter.post('/tipos/eventos/update', verifyTokenAndAdmin, updateEvento)
tiposRouter.post('/tipos/eventos/delete', verifyTokenAndAdmin, removeEvento)
// fraudes
tiposRouter.post('/tipos/fraudes/insert', verifyTokenAndAdmin, insertFraude)
tiposRouter.post('/tipos/fraudes/update', verifyTokenAndAdmin, updateFraude)
tiposRouter.post('/tipos/fraudes/delete', verifyTokenAndAdmin, removeFraude)
// hitos
tiposRouter.post('/tipos/hitos/insert', verifyTokenAndAdmin, insertHito)
tiposRouter.post('/tipos/hitos/update', verifyTokenAndAdmin, updateHito)
tiposRouter.post('/tipos/hitos/delete', verifyTokenAndAdmin, removeHito)

export default tipoCierreRouter