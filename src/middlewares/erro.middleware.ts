import type { ErrorRequestHandler } from "express";


export const erroMiddleware: ErrorRequestHandler = (
  erro,
  _req,
  res,
  _next
) => {
  console.error("[Erro não tratado]", erro);

  res.status(500).json({ erro: "Erro interno do servidor" });
};