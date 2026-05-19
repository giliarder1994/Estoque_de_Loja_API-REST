import { Router } from "express";
import { autenticar } from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/produtos.controller.js";

const router = Router();

router.use(autenticar);

router.get("/", controller.listarProdutos);
router.get("/:id", controller.buscarUm);
router.post("/", controller.criar);
router.put("/:id", controller.editar);
router.delete("/:id", controller.deletar);

export default router;