import express from "express";
import authRoutes from "../middleware/auth";
import {
  mainPage,
  addPage,
  editPage,
  hitoseventosPage,
  addEventosPage,
  editEventosPage,
  addHitosPage,
  editHitosPage,
  smssPage,
  smssAddPage,
  smssEditPage,
  resolverPage,
  ejercicioPage,
  verTodo,
  insert,
  update,
  remove,
  asignar,
  desasignar,
  resolver,
  ejercicio,
  insertHito,
  updateHito,
  removeHito,
  archivoHito,
  insertEvento,
  updateEvento,
  removeEvento,
  insertSms,
  updateSms,
  removeSms,
  relacionPage,
} from "../controllers/fraude.controller";

const fraudeRouter = express.Router();

// paginas fraude
fraudeRouter.get("/fraudes", authRoutes, mainPage);
fraudeRouter.get("/fraudes/add", authRoutes, addPage);
fraudeRouter.get("/fraudes/edit/:id", authRoutes, editPage);
fraudeRouter.get("/fraudes/resolver/:id", authRoutes, resolverPage);
fraudeRouter.get("/fraudes/relacion/:id", authRoutes, relacionPage);
fraudeRouter.get("/fraudes/ejercicio/:id", authRoutes, ejercicioPage);

// pag smss
fraudeRouter.get("/fraudes/sms/:id", authRoutes, smssPage);
fraudeRouter.get("/fraudes/smss/add/:id", authRoutes, smssAddPage);
fraudeRouter.get("/fraudes/smss/edit/:idfra/:idsms", authRoutes, smssEditPage);

// page hitoseventos
fraudeRouter.get("/fraudes/hitoseventos/:id", authRoutes, hitoseventosPage);

// page hitos
fraudeRouter.get("/fraudes/hitos/add/:id", authRoutes, addHitosPage);
fraudeRouter.get("/fraudes/hitos/edit/:idfra/:idhit", authRoutes, editHitosPage);

// page eventos
fraudeRouter.get("/fraudes/eventos/add/:id", authRoutes, addEventosPage);
fraudeRouter.get("/fraudes/eventos/edit/:idfra/:ideve", authRoutes, editEventosPage);

// procedures
fraudeRouter.post("/fraudes/insert", authRoutes, insert);
fraudeRouter.post("/fraudes/update", authRoutes, update);
fraudeRouter.post("/fraudes/delete", authRoutes, remove);
fraudeRouter.post("/fraudes/asignar", authRoutes, asignar);
fraudeRouter.post("/fraudes/resolver", authRoutes, resolver);
fraudeRouter.post("/fraudes/ejercicio", authRoutes, ejercicio);
fraudeRouter.post("/fraudes/desasignar", authRoutes, desasignar);

// proc sms
fraudeRouter.post("/fraudes/sms/insert", authRoutes, insertSms);
fraudeRouter.post("/fraudes/sms/update", authRoutes, updateSms);
fraudeRouter.post("/fraudes/sms/delete", authRoutes, removeSms);

// hitos
fraudeRouter.post("/fraudes/hitos/insert", authRoutes, insertHito);
fraudeRouter.post("/fraudes/hitos/update", authRoutes, updateHito);
fraudeRouter.post("/fraudes/hitos/delete", authRoutes, removeHito);
fraudeRouter.post("/fraudes/hitos/archivado", authRoutes, archivoHito);

// eventos
fraudeRouter.post("/fraudes/eventos/insert", authRoutes, insertEvento);
fraudeRouter.post("/fraudes/eventos/update", authRoutes, updateEvento);
fraudeRouter.post("/fraudes/eventos/delete", authRoutes, removeEvento);

// otros
fraudeRouter.get("/fraudes/vertodo", authRoutes, verTodo);

export default fraudeRouter;
