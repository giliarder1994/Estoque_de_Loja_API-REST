import { Router } from "express";
import { cadastrar, login } from "../controllers/usuarios.controller.js";

const router = Router();

router.post("/registrar", cadastrar);
router.post("/login", login);

export default router;