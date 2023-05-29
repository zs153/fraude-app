import express from 'express'
import { verifyTokenAndAdmin,verifyTokenAndResp } from "../middleware/auth";

import * as oficina from '../controllers/admin/oficina.controller'
import * as usuario from '../controllers/admin/usuario.controller'
import * as historico from '../controllers/admin/historico.controller'
import * as tipocierre from '../controllers/admin/tipocierre.controller'
import * as fraude from '../controllers/admin/fraude.controller'

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

// pag tipocierre
adminRouter.get('/tipos/cierres', verifyTokenAndAdmin, tipocierre.mainPage)
adminRouter.get('/tipos/cierres/add', verifyTokenAndAdmin, tipocierre.addPage)
adminRouter.get('/tipos/cierres/edit/:id', verifyTokenAndAdmin, tipocierre.editPage)

// page fraude
adminRouter.get("/fraudes", verifyTokenAndResp, fraude.mainPage);
adminRouter.get("/fraudes/resueltos", verifyTokenAndResp, fraude.resueltosPage);
adminRouter.get("/fraudes/add", verifyTokenAndResp, fraude.addPage);
adminRouter.get("/fraudes/edit/:id", verifyTokenAndResp, fraude.editPage);
adminRouter.get("/fraudes/resolver/:id", verifyTokenAndResp, fraude.resolverPage);

// page hitoseventos
adminRouter.get("/fraudes/hitoseventos/:id", verifyTokenAndResp, fraude.hitoseventosPage);
adminRouter.get("/fraudes/hitoseventos/readonly/:id", verifyTokenAndResp, fraude.hitoseventosReadonlyPage);

// page hitos
adminRouter.get("/fraudes/hitos/add/:id", verifyTokenAndResp, fraude.addHitosPage);
adminRouter.get("/fraudes/hitos/edit/:idfra/:idhit", verifyTokenAndResp, fraude.editHitosPage);

// page eventos
adminRouter.get("/fraudes/eventos/add/:id", verifyTokenAndResp, fraude.addEventosPage);
adminRouter.get("/fraudes/eventos/edit/:idfra/:ideve", verifyTokenAndResp, fraude.editEventosPage);

// page ejercios
adminRouter.get("/fraudes/ejercicios/add/:id", verifyTokenAndResp, fraude.addEjercicioPage);

// page relacion
adminRouter.get("/fraudes/relaciones/:id", verifyTokenAndResp, fraude.relacionesPage);
adminRouter.get("/fraudes/relaciones/add/:id", verifyTokenAndResp, fraude.relacionesAddPage);
adminRouter.get("/fraudes/relaciones/edit/:idfra/:idrel", verifyTokenAndResp, fraude.relacionesEditPage);
adminRouter.get("/fraudes/relaciones/readonly/:id", verifyTokenAndResp, fraude.relacionesReadonlyPage);

// page smss
adminRouter.get("/fraudes/smss/:id", verifyTokenAndResp, fraude.smssPage);
adminRouter.get("/fraudes/smss/add/:id", verifyTokenAndResp, fraude.smssAddPage);
adminRouter.get("/fraudes/smss/edit/:idfra/:idsms", verifyTokenAndResp, fraude.smssEditPage);
adminRouter.get("/fraudes/smss/readonly/:id", verifyTokenAndResp, fraude.smssReadonlyPage);

//--------------- procedures
// oficinas
adminRouter.post('/oficinas/insert', verifyTokenAndAdmin, oficina.insert)
adminRouter.post('/oficinas/update', verifyTokenAndAdmin, oficina.update)
adminRouter.post('/oficinas/delete', verifyTokenAndAdmin, oficina.remove)

// historico
adminRouter.post('/historicos/activar', verifyTokenAndResp, historico.activar)
adminRouter.post('/historicos/update', verifyTokenAndResp, historico.update)

// usuarios
adminRouter.post('/usuarios/insert', verifyTokenAndResp, usuario.insert)
adminRouter.post('/usuarios/update', verifyTokenAndResp, usuario.update)
adminRouter.post('/usuarios/delete', verifyTokenAndResp, usuario.remove)

// tipocierre
adminRouter.post('/tipos/cierres/insert', verifyTokenAndAdmin, tipocierre.insert)
adminRouter.post('/tipos/cierres/update', verifyTokenAndAdmin, tipocierre.update)
adminRouter.post('/tipos/cierres/delete', verifyTokenAndAdmin, tipocierre.remove)

// fraudes
adminRouter.post("/fraudes/insert", verifyTokenAndResp, fraude.insert);
adminRouter.post("/fraudes/update", verifyTokenAndResp, fraude.update);
adminRouter.post("/fraudes/delete", verifyTokenAndResp, fraude.remove);
adminRouter.post("/fraudes/asignar", verifyTokenAndResp, fraude.asignar);
adminRouter.post("/fraudes/desasignar", verifyTokenAndResp, fraude.desasignar);
adminRouter.post("/fraudes/resolver", verifyTokenAndResp, fraude.resolver);

// hitos
adminRouter.post("/fraudes/hitos/insert", verifyTokenAndResp, fraude.insertHito);
adminRouter.post("/fraudes/hitos/update", verifyTokenAndResp, fraude.updateHito);
adminRouter.post("/fraudes/hitos/delete", verifyTokenAndResp, fraude.removeHito);
adminRouter.post("/fraudes/hitos/archivado", verifyTokenAndResp, fraude.archivoHito);

// eventos
adminRouter.post("/fraudes/eventos/insert", verifyTokenAndResp, fraude.insertEvento);
adminRouter.post("/fraudes/eventos/update", verifyTokenAndResp, fraude.updateEvento);
adminRouter.post("/fraudes/eventos/delete", verifyTokenAndResp, fraude.removeEvento);

// ejercicios
adminRouter.post("/fraudes/ejercicios/insert", verifyTokenAndResp, fraude.insertEjercicio);

// relacion
adminRouter.post("/fraudes/relaciones/insert", verifyTokenAndResp, fraude.insertRelacion);
adminRouter.post("/fraudes/relaciones/update", verifyTokenAndResp, fraude.updateRelacion);
adminRouter.post("/fraudes/relaciones/delete", verifyTokenAndResp, fraude.removeRelacion);

// sms
adminRouter.post("/fraudes/smss/insert", verifyTokenAndResp, fraude.insertSms);
adminRouter.post("/fraudes/smss/update", verifyTokenAndResp, fraude.updateSms);
adminRouter.post("/fraudes/smss/delete", verifyTokenAndResp, fraude.removeSms);

export default adminRouter