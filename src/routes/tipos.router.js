import express from "express";
import {cierre, cierres, crearCierre, modificarCierre, borrarCierre,
  evento, eventos, crearEvento, modificarEvento, borrarEvento, 
  fraude, fraudes, crearFraude, modificarFraude, borrarFraude, 
  hito, hitos, crearHito, modificarHito, borrarHito,
} from "../controllers/tipos.controller";

const apiTiposRouter = express.Router();

// cierres
apiTiposRouter.post("/tipos/cierre", cierre);
apiTiposRouter.post("/tipos/cierres", cierres);
apiTiposRouter.post("/tipos/cierres/insert", crearCierre);
apiTiposRouter.post("/tipos/cierres/update", modificarCierre);
apiTiposRouter.post("/tipos/cierres/delete", borrarCierre);
// eventos
apiTiposRouter.post("/tipos/evento", evento);
apiTiposRouter.post("/tipos/eventos", eventos);
apiTiposRouter.post("/tipos/eventos/insert", crearEvento);
apiTiposRouter.post("/tipos/eventos/update", modificarEvento);
apiTiposRouter.post("/tipos/eventos/delete", borrarEvento);
// fraudes
apiTiposRouter.post("/tipos/fraude", fraude);
apiTiposRouter.post("/tipos/fraudes", fraudes);
apiTiposRouter.post("/tipos/fraudes/insert", crearFraude);
apiTiposRouter.post("/tipos/fraudes/update", modificarFraude);
apiTiposRouter.post("/tipos/fraudes/delete", borrarFraude);
// hitos
apiTiposRouter.post("/tipos/hito", hito);
apiTiposRouter.post("/tipos/hitos", hitos);
apiTiposRouter.post("/tipos/hitos/insert", crearHito);
apiTiposRouter.post("/tipos/hitos/update", modificarHito);
apiTiposRouter.post("/tipos/hitos/delete", borrarHito);

export default apiTiposRouter;