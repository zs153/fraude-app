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
userRouter.get("/fraudes/ejercicio/:id", authRoutes, fraude.ejercicioPage);

// page hitoseventos
userRouter.get("/fraudes/hitoseventos/:id", authRoutes, fraude.hitoseventosPage);
userRouter.get("/fraudes/hitoseventos/readonly/:id", authRoutes, fraude.hitoseventosReadonlyPage);

// page hitos
userRouter.get("/fraudes/hitos/add/:id", authRoutes, fraude.addHitosPage);
userRouter.get("/fraudes/hitos/edit/:idfra/:idhit", authRoutes, fraude.editHitosPage);

// page eventos
userRouter.get("/fraudes/eventos/add/:id", authRoutes, fraude.addEventosPage);
userRouter.get("/fraudes/eventos/edit/:idfra/:ideve", authRoutes, fraude.editEventosPage);

//--------------- procedures
// perfil
userRouter.post('/perfil', authRoutes, usuario.updatePerfil)

// cambio password
userRouter.post('/cambio', authRoutes, usuario.changePassword)

// estados
userRouter.post("/fraudes/insert", authRoutes, fraude.insert);
userRouter.post("/fraudes/update", authRoutes, fraude.update);
userRouter.post("/fraudes/delete", authRoutes, fraude.remove);
userRouter.post("/fraudes/asignar", authRoutes, fraude.asignar);
userRouter.post("/fraudes/desasignar", authRoutes, fraude.desasignar);
userRouter.post("/fraudes/resolver", authRoutes, fraude.resolver);
userRouter.post("/fraudes/ejercicio", authRoutes, fraude.ejercicio);

export default userRouter