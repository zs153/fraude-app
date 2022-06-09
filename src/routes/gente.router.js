import express from "express";
import { getGente } from "../controllers/gente.controller";

const apiSmsRouter = express.Router();

// smss
apiSmsRouter.post("/gente", getGente);

export default apiSmsRouter;
