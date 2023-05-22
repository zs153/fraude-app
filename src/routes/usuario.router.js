import express from "express";
import {
  borrar,
  crear,
  modificiar,
  perfil,
  usuario,
  usuarios,
} from "../controllers/usuario.controller";

const apiUsuarioRouter = express.Router();

// usuarios
apiUsuarioRouter.post("/usuario", usuario);
apiUsuarioRouter.post("/usuarios", usuarios);
apiUsuarioRouter.post("/usuarios/insert", crear);
apiUsuarioRouter.post("/usuarios/update", modificiar);
apiUsuarioRouter.post("/usuarios/delete", borrar);
apiUsuarioRouter.post("/usuarios/perfil", perfil);

export default apiUsuarioRouter;
