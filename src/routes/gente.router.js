import express from "express";
import { getGente } from "../controllers/gente.controller";

const apiGenteRouter = express.Router();

// smss
apiGenteSmsRouter.post("/gente", getGente);

export default apiGenteRouter;
