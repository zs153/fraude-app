import express from 'express'
import authRoutes from '../middleware/auth'
import * as usuario from '../controllers/user/usuario.controller'
import * as fraude from '../controllers/user/fraude.controller'

const userRouter = express.Router()

//--------------- paginas
userRouter.get('/', authRoutes, usuario.mainPage)
userRouter.get("/logout", usuario.logoutPage)

// perfil
userRouter.get('/perfil/:userid', authRoutes, usuario.perfilPage)

// fraude
userRouter.get("/fraudes", authRoutes,fraude.mainPage);
userRouter.get("/fraudes/resueltos", authRoutes, fraude.resueltosPage);
userRouter.get("/fraudes/add", authRoutes, fraude.addPage);
userRouter.get("/fraudes/edit/:id", authRoutes, fraude.editPage);
userRouter.get("/fraudes/resolver/:id", authRoutes, fraude.resolverPage);

// page hitoseventos
userRouter.get("/fraudes/hitoseventos/:id", authRoutes, fraude.hitoseventosPage);
userRouter.get("/fraudes/hitoseventos/readonly/:id", authRoutes, fraude.hitoseventosReadonlyPage);

// page hitos
userRouter.get("/fraudes/hitos/add/:id", authRoutes, fraude.addHitosPage);
userRouter.get("/fraudes/hitos/edit/:idfra/:idhit", authRoutes, fraude.editHitosPage);

// page eventos
userRouter.get("/fraudes/eventos/add/:id", authRoutes, fraude.addEventosPage);
userRouter.get("/fraudes/eventos/edit/:idfra/:ideve", authRoutes, fraude.editEventosPage);

// page ejercios
userRouter.get("/fraudes/ejercicios/add/:id", authRoutes, fraude.addEjercicioPage);

// pag relacion
userRouter.get("/fraudes/relaciones/:id", authRoutes, fraude.relacionesPage);
userRouter.get("/fraudes/relaciones/add/:id", authRoutes, fraude.relacionesAddPage);
userRouter.get("/fraudes/relaciones/edit/:idfra/:idrel", authRoutes, fraude.relacionesEditPage);
userRouter.get("/fraudes/relaciones/readonly/:id", authRoutes, fraude.relacionesReadonlyPage);

//--------------- procedures
// perfil
userRouter.post('/perfil', authRoutes, usuario.updatePerfil)

// cambio password
userRouter.post('/cambio', authRoutes, usuario.changePassword)

// fraudes
userRouter.post("/fraudes/insert", authRoutes, fraude.insert);
userRouter.post("/fraudes/update", authRoutes, fraude.update);
userRouter.post("/fraudes/delete", authRoutes, fraude.remove);
userRouter.post("/fraudes/asignar", authRoutes, fraude.asignar);
userRouter.post("/fraudes/desasignar", authRoutes, fraude.desasignar);
userRouter.post("/fraudes/resolver", authRoutes, fraude.resolver);

// hitos
userRouter.post("/fraudes/hitos/insert", authRoutes, fraude.insertHito);
userRouter.post("/fraudes/hitos/update", authRoutes, fraude.updateHito);
userRouter.post("/fraudes/hitos/delete", authRoutes, fraude.removeHito);
userRouter.post("/fraudes/hitos/archivado", authRoutes, fraude.archivoHito);

// eventos
userRouter.post("/fraudes/eventos/insert", authRoutes, fraude.insertEvento);
userRouter.post("/fraudes/eventos/update", authRoutes, fraude.updateEvento);
userRouter.post("/fraudes/eventos/delete", authRoutes, fraude.removeEvento);

// ejercicios
userRouter.post("/fraudes/ejercicios/insert", authRoutes, fraude.insertEjercicio);

// relacion
userRouter.post("/fraudes/relaciones/insert", authRoutes, fraude.insertRelacion);
userRouter.post("/fraudes/relaciones/update", authRoutes, fraude.updateRelacion);
userRouter.post("/fraudes/relaciones/delete", authRoutes, fraude.removeRelacion);

// estados

export default userRouter