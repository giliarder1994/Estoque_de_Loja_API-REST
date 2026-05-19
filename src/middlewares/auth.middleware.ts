import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/index.js";

export function autenticar(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ erro: "Token não fornecido" });
    return; 
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    res.status(401).json({ erro: "Formato de token inválido" });
    return;
  }

  try {
    const secret = process.env["JWT_SECRET"] ?? "secret";
    const payload = jwt.verify(token, secret) as JwtPayload;
    req.usuario = payload; 
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}