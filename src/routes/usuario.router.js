import express from "express";
import {
  cambio,
  insert,
  olvido,
  perfil,
  remove,
  update,
  usuario,
  usuarios,
} from "../controllers/usuario.controller";

const apiUsuarioRouter = express.Router();

// usuarios
apiUsuarioRouter.post("/usuario", usuario);
apiUsuarioRouter.post("/usuarios", usuarios);
apiUsuarioRouter.post("/usuarios/insert", insert);
apiUsuarioRouter.post("/usuarios/update", update);
apiUsuarioRouter.post("/usuarios/delete", remove);
apiUsuarioRouter.post("/usuarios/cambio", cambio);
apiUsuarioRouter.post("/usuarios/forgot", olvido);
apiUsuarioRouter.post("/usuarios/perfil", perfil);

export default apiUsuarioRouter;
