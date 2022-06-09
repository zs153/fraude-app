import express from "express";
import {
  tipo,
  tipos,
  crear,
  modificar,
  borrar,
} from "../controllers/tipoevento.controller";

const apiTipoRouter = express.Router();

// tipos
apiTipoRouter.post("/tipos/evento", tipo);
apiTipoRouter.post("/tipos/eventos", tipos);
apiTipoRouter.post("/tipos/eventos/insert", crear);
apiTipoRouter.post("/tipos/eventos/update", modificar);
apiTipoRouter.post("/tipos/eventos/delete", borrar);

export default apiTipoRouter;
