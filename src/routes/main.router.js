import express from "express";
import authRoutes from "../middleware/auth";
import { mainPage } from "../controllers/main.controller";

const mainRouter = express.Router();

// acciones
mainRouter.get("/", authRoutes, mainPage);

export default mainRouter;
