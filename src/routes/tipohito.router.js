import express from "express";
import {
  tipo,
  tipos,
  crear,
  modificar,
  borrar,
} from "../controllers/tipohito.controller";

const apiTipoRouter = express.Router();

// tipos
apiTipoRouter.post("/tipos/hito", tipo);
apiTipoRouter.post("/tipos/hitos", tipos);
apiTipoRouter.post("/tipos/hitos/insert", crear);
apiTipoRouter.post("/tipos/hitos/update", modificar);
apiTipoRouter.post("/tipos/hitos/delete", borrar);

export default apiTipoRouter;
