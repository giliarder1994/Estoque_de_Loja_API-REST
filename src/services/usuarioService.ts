import pool from "../config/db.js";
import type { Usuario } from "../types/index.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

type UsuarioRow = Usuario & RowDataPacket;

export async function buscarPorEmail(
  email: string
): Promise<Usuario | undefined> {
  const [rows] = await pool.execute<UsuarioRow[]>(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );
  return rows[0];
}

export async function criar(
  nome: string,
  email: string,
  senhaHash: string
): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senhaHash]
  );
  return result.insertId;
}