import express from "express";
import {
  borrar,
  cambioEstado,
  crear,
  modificar,
  sms,
  smss,
} from "../controllers/sms.controller";

const apiSmsRouter = express.Router();

// smss
apiSmsRouter.post("/sms", sms);
apiSmsRouter.post("/smss", smss);
apiSmsRouter.post("/smss/insert", crear);
apiSmsRouter.post("/smss/update", modificar);
apiSmsRouter.post("/smss/delete", borrar);
apiSmsRouter.post("/smss/cambio", cambioEstado);

export default apiSmsRouter;
