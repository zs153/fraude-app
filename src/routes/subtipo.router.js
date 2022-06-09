import express from "express";
import {
  subtipo,
  subtipos,
  crear,
  modificar,
  borrar,
} from "../controllers/subtipo.controller";

const apiSubtipoRouter = express.Router();

// subtipos
apiSubtipoRouter.post("/subtipo", subtipo);
apiSubtipoRouter.post("/subtipos", subtipos);
apiSubtipoRouter.post("/subtipos/insert", crear);
apiSubtipoRouter.post("/subtipos/update", modificar);
apiSubtipoRouter.post("/subtipos/delete", borrar);

export default apiSubtipoRouter;
