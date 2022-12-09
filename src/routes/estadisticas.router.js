import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import { mainPage, generarEstadistica } from "../controllers/estadistica.controller";

const estadisticaRouter = express.Router();

// paginas
estadisticaRouter.get("/estadisticas", verifyTokenAndAdmin, mainPage);

// proc
estadisticaRouter.post("/estadisticas", verifyTokenAndAdmin, generarEstadistica);

export default estadisticaRouter;