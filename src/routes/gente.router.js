import express from "express";
import { getGente } from "../controllers/gente.controller";

const apiGenteRouter = express.Router();

// smss
apiGenteRouter.post("/gente", getGente);

export default apiGenteRouter;
