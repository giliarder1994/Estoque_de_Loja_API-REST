import type { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as usuarioService from "../services/usuarioService.js";
import type { CadastroDTO, LoginDTO } from "../types/index.js";

const BCRYPT_ROUNDS = 12;


export const cadastrar: RequestHandler<
  Record<string, never>,
  unknown,
  CadastroDTO
> = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      res.status(400).json({ erro: "Nome, email e senha são obrigatórios" });
      return;
    }

    const existente = await usuarioService.buscarPorEmail(email);
    if (existente) {
      res.status(409).json({ erro: "Este email já está cadastrado" });
      return;
    }

    const hash = await bcrypt.hash(senha, BCRYPT_ROUNDS);
    const id = await usuarioService.criar(nome, email, hash);

    res.status(201).json({ id, nome, email });
  } catch (error) {
    next(error);
  }
};


export const login: RequestHandler<
  Record<string, never>,
  unknown,
  LoginDTO
> = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      res.status(400).json({ erro: "Email e senha são obrigatórios" });
      return;
    }

    const usuario = await usuarioService.buscarPorEmail(email);

    if (!usuario) {
      res.status(401).json({ erro: "Email ou senha inválidos" });
      return;
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      res.status(401).json({ erro: "Email ou senha inválidos" });
      return;
    }

    const secret = process.env["JWT_SECRET"] ?? "secret";

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};