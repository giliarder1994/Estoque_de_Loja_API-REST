import "dotenv/config";
import express from "express";
import produtosRouter from "./routes/produtos.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import { erroMiddleware } from "./middlewares/erro.middleware.js";

const app = express();

app.use(express.json());

app.use("/produtos", produtosRouter);
app.use("/auth", usuariosRouter);

app.use(erroMiddleware);

export default app;