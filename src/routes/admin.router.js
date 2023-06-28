import express from 'express'
import { verifyTokenAndAdmin, verifyTokenAndResp } from "../middleware/auth";

import * as oficina from '../controllers/admin/oficina.controller'
import * as usuario from '../controllers/admin/usuario.controller'
import * as historico from '../controllers/admin/historico.controller'
import * as tipos from '../controllers/admin/tipos.controller'
import * as fraude from '../controllers/admin/fraude.controller'
import * as carga from '../controllers/admin/carga.controller'
import * as estadistica from '../controllers/admin/estadistica.controller'

const adminRouter = express.Router()

//--------------- paginas
// oficinas
adminRouter.get('/oficinas', verifyTokenAndAdmin, oficina.mainPage)
adminRouter.get('/oficinas/add', verifyTokenAndAdmin, oficina.addPage)
adminRouter.get('/oficinas/edit/:id', verifyTokenAndAdmin, oficina.editPage)

// historico
adminRouter.get('/historicos', verifyTokenAndAdmin, historico.mainPage)
adminRouter.get('/historicos/edit/:id', verifyTokenAndAdmin, historico.editPage)

// usuarios
adminRouter.get('/usuarios', verifyTokenAndResp, usuario.mainPage)
adminRouter.get('/usuarios/add', verifyTokenAndResp, usuario.addPage)
adminRouter.get('/usuarios/edit/:id', verifyTokenAndResp, usuario.editPage)

// tipos
// cierres
adminRouter.get('/tipos/cierres', verifyTokenAndAdmin, tipos.mainCierresPage)
adminRouter.get('/tipos/cierres/add', verifyTokenAndAdmin, tipos.addCierrePage)
adminRouter.get('/tipos/cierres/edit/:id', verifyTokenAndAdmin, tipos.editCierrePage)
// eventos
adminRouter.get('/tipos/eventos', verifyTokenAndAdmin, tipos.mainEventosPage)
adminRouter.get('/tipos/eventos/add', verifyTokenAndAdmin, tipos.addEventoPage)
adminRouter.get('/tipos/eventos/edit/:id', verifyTokenAndAdmin, tipos.editEventoPage)
// fraudes
adminRouter.get('/tipos/fraudes', verifyTokenAndAdmin, tipos.mainFraudesPage)
adminRouter.get('/tipos/fraudes/add', verifyTokenAndAdmin, tipos.addFraudePage)
adminRouter.get('/tipos/fraudes/edit/:id', verifyTokenAndAdmin, tipos.editFraudePage)
// hitos
adminRouter.get('/tipos/hitos', verifyTokenAndAdmin, tipos.mainHitosPage)
adminRouter.get('/tipos/hitos/add', verifyTokenAndAdmin, tipos.addHitoPage)
adminRouter.get('/tipos/hitos/edit/:id', verifyTokenAndAdmin, tipos.editHitoPage)

// fraude
adminRouter.get("/fraudes", verifyTokenAndResp, fraude.mainPage);
adminRouter.get("/fraudes/edit/:id", verifyTokenAndResp, fraude.editPage);
adminRouter.get("/fraudes/resueltos", verifyTokenAndResp, fraude.resueltosPage);
adminRouter.get("/fraudes/readonly/:id", verifyTokenAndResp, fraude.readonlyPage);
// hitoseventos
adminRouter.get("/fraudes/hitoseventos/:id", verifyTokenAndResp, fraude.hitoseventosPage);
adminRouter.get("/fraudes/hitoseventos/readonly/:id", verifyTokenAndResp, fraude.hitoseventosReadonlyPage);
// relacion
adminRouter.get("/fraudes/relaciones/:id", verifyTokenAndResp, fraude.relacionesPage);
adminRouter.get("/fraudes/relaciones/readonly/:id", verifyTokenAndResp, fraude.relacionesReadonlyPage);
// smss
adminRouter.get("/fraudes/smss/:id", verifyTokenAndResp, fraude.smssPage);
adminRouter.get("/fraudes/smss/readonly/:id", verifyTokenAndResp, fraude.smssReadonlyPage);
// ades
adminRouter.get("/fraudes/ades", verifyTokenAndResp, fraude.adesPage);
adminRouter.get("/fraudes/ades/asignar/:id", verifyTokenAndResp, fraude.adesAsignarPage);
adminRouter.get("/fraudes/ades/desasignar/:id", verifyTokenAndResp, fraude.adesDesasignarPage);

// page carga
adminRouter.get('/cargas', verifyTokenAndAdmin, carga.mainPage)
adminRouter.get('/cargas/add', verifyTokenAndAdmin, carga.addPage)

// estadistica
adminRouter.get("/estadisticas", verifyTokenAndAdmin, estadistica.mainPage);

//--------------- procedures
// oficinas
adminRouter.post('/oficinas/insert', verifyTokenAndAdmin, oficina.insert)
adminRouter.post('/oficinas/update', verifyTokenAndAdmin, oficina.update)
adminRouter.post('/oficinas/delete', verifyTokenAndAdmin, oficina.remove)

// historico
adminRouter.post('/historicos/activar', verifyTokenAndResp, historico.activar)
adminRouter.post('/historicos/update', verifyTokenAndResp, historico.update)
adminRouter.post('/historicos/delete', verifyTokenAndResp, historico.remove)

// usuarios
adminRouter.post('/usuarios/insert', verifyTokenAndResp, usuario.insert)
adminRouter.post('/usuarios/update', verifyTokenAndResp, usuario.update)
adminRouter.post('/usuarios/delete', verifyTokenAndResp, usuario.remove)

// tipos
// cierres
adminRouter.post('/tipos/cierres/insert', verifyTokenAndAdmin, tipos.insertCierre)
adminRouter.post('/tipos/cierres/update', verifyTokenAndAdmin, tipos.updateCierre)
adminRouter.post('/tipos/cierres/delete', verifyTokenAndAdmin, tipos.removeCierre)
// eventos
adminRouter.post('/tipos/eventos/insert', verifyTokenAndAdmin, tipos.insertEvento)
adminRouter.post('/tipos/eventos/update', verifyTokenAndAdmin, tipos.updateEvento)
adminRouter.post('/tipos/eventos/delete', verifyTokenAndAdmin, tipos.removeEvento)
// fraudes
adminRouter.post('/tipos/fraudes/insert', verifyTokenAndAdmin, tipos.insertFraude)
adminRouter.post('/tipos/fraudes/update', verifyTokenAndAdmin, tipos.updateFraude)
adminRouter.post('/tipos/fraudes/delete', verifyTokenAndAdmin, tipos.removeFraude)
// hitos
adminRouter.post('/tipos/hitos/insert', verifyTokenAndAdmin, tipos.insertHito)
adminRouter.post('/tipos/hitos/update', verifyTokenAndAdmin, tipos.updateHito)
adminRouter.post('/tipos/hitos/delete', verifyTokenAndAdmin, tipos.removeHito)

// fraude
adminRouter.post('/fraudes/update', verifyTokenAndResp, fraude.update)

// ades
adminRouter.post("/fraudes/ades/asignar", verifyTokenAndResp, fraude.asignarFraudes);
adminRouter.post("/fraudes/ades/desasignar", verifyTokenAndResp, fraude.desAsignarFraudes);

// carga
adminRouter.post('/cargas/insert', verifyTokenAndAdmin, carga.insert)

// estadistica
adminRouter.post("/estadisticas", verifyTokenAndAdmin, estadistica.generarEstadistica);

export default adminRouter