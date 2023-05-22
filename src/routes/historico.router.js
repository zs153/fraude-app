import express from "express";
import {
  activar,
  historico,
  historicos,
  modificar,
} from "../controllers/historico.controller";

const apiHistoricoRouter = express.Router();

// historicos
apiHistoricoRouter.post("/historico", historico);
apiHistoricoRouter.post("/historicos", historicos);
apiHistoricoRouter.post('/historicos/update', modificar)
apiHistoricoRouter.post("/historicos/activar", activar);

export default apiHistoricoRouter;