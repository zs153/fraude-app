import express from "express";
import {
  tipo,
  tipos,
  crear,
  modificar,
  borrar,
} from "../controllers/tipocierre.controller";

const apiSubtipoRouter = express.Router();

// subtipos
apiSubtipoRouter.post("/tipos/cierre", tipo);
apiSubtipoRouter.post("/tipos/cierres", tipos);
apiSubtipoRouter.post("/tipos/cierres/insert", crear);
apiSubtipoRouter.post("/tipos/cierres/update", modificar);
apiSubtipoRouter.post("/tipos/cierres/delete", borrar);

export default apiSubtipoRouter;
