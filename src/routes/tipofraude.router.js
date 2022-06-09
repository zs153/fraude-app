import express from "express";
import {
  tipo,
  tipos,
  crear,
  modificar,
  borrar,
} from "../controllers/tipofraude.controller";

const apiTipoFraude = express.Router();

// tipos
apiTipoFraude.post("/tipos/fraude", tipo);
apiTipoFraude.post("/tipos/fraudes", tipos);
apiTipoFraude.post("/tipos/fraudes/insert", crear);
apiTipoFraude.post("/tipos/fraudes/update", modificar);
apiTipoFraude.post("/tipos/fraudes/delete", borrar);

export default apiTipoFraude;
