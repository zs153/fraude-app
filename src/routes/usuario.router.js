import express from "express";
import {
  cambioPassword,
  insert,
  olvidoPassword,
  perfil,
  registro,
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
apiUsuarioRouter.post("/usuarios/registro", registro);
apiUsuarioRouter.post("/usuarios/cambio", cambioPassword);
apiUsuarioRouter.post("/usuarios/forgot", olvidoPassword);
apiUsuarioRouter.post("/usuarios/perfil", perfil);

export default apiUsuarioRouter;
