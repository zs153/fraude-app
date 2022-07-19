import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  hitoseventosPage,
  insert,
  update,
  remove,
  asign,
  resol,
  unasign,
  verTodo,
  sms,
  insertHito,
  updateHito,
  deleteHito,
  archivoHito,
  insertEvento,
  updateEvento,
  deleteEvento,
  addHitosPage,
  editHitosPage,
  addEventosPage,
  editEventosPage,
  resolverPage,
  ejercicioPage,
  ejercicio,
  relacionPage,
  relacion,
  deshacer,
  roHitosEventosPage,
} from "../controllers/fraude.controller";

const fraudeRouter = express.Router();

// paginas
fraudeRouter.get("/fraudes", authRoutes, mainPage);
fraudeRouter.get("/fraudes/add", authRoutes, addPage);
fraudeRouter.get("/fraudes/edit/:id", authRoutes, editPage);
fraudeRouter.get("/fraudes/sms", authRoutes, mainPage);
fraudeRouter.get("/fraudes/resolver/:id", authRoutes, resolverPage);
fraudeRouter.get("/fraudes/ejercicio/:id", authRoutes, ejercicioPage);
fraudeRouter.get("/fraudes/relacionado/:id", authRoutes, relacionPage);
fraudeRouter.get("/fraudes/vertodo", authRoutes, verTodo);

// hitoseventos
fraudeRouter.get("/fraudes/hitoseventos/:id", authRoutes, hitoseventosPage);
fraudeRouter.get("/fraudes/hitoseventos/readonly/:id", authRoutes, roHitosEventosPage);

// hitos
fraudeRouter.get("/fraudes/hitos/add/:id", authRoutes, addHitosPage);
fraudeRouter.get(
  "/fraudes/hitos/edit/:idfra/:idhit",
  authRoutes,
  editHitosPage
);
// eventos
fraudeRouter.get("/fraudes/eventos/add/:id", authRoutes, addEventosPage);
fraudeRouter.get(
  "/fraudes/eventos/edit/:idfra/:ideve",
  authRoutes,
  editEventosPage
);

// procedures
fraudeRouter.post("/fraudes/insert", authRoutes, insert);
fraudeRouter.post("/fraudes/update", authRoutes, update);
fraudeRouter.post("/fraudes/delete", authRoutes, remove);
fraudeRouter.post("/fraudes/asignar", authRoutes, asign);
fraudeRouter.post("/fraudes/resolver", authRoutes, resol);
fraudeRouter.post("/fraudes/ejercicio", authRoutes, ejercicio);
fraudeRouter.post("/fraudes/relacionado", authRoutes, relacion);
fraudeRouter.post("/fraudes/desasignar", authRoutes, unasign);
fraudeRouter.post("/fraudes/deshacer", authRoutes, deshacer);
fraudeRouter.post("/fraudes/sms", authRoutes, sms);
// hitos
fraudeRouter.post("/fraudes/hitos/insert", authRoutes, insertHito);
fraudeRouter.post("/fraudes/hitos/update", authRoutes, updateHito);
fraudeRouter.post("/fraudes/hitos/delete", authRoutes, deleteHito);
fraudeRouter.post("/fraudes/hitos/archivado", authRoutes, archivoHito);
// eventos
fraudeRouter.post("/fraudes/eventos/insert", authRoutes, insertEvento);
fraudeRouter.post("/fraudes/eventos/update", authRoutes, updateEvento);
fraudeRouter.post("/fraudes/eventos/delete", authRoutes, deleteEvento);

export default fraudeRouter;
