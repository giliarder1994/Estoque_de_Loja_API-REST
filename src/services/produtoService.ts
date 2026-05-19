import pool from "../config/db.js";
import type { Produto, ProdutoDTO } from "../types/index.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

type ProdutoRow = Produto & RowDataPacket;

export async function buscarTodos(
  categoria: string | undefined,
  limite: number,
  offset: number
): Promise<Produto[]> {
  let sql = "SELECT * FROM produtos";
  const params: (string | number)[] = [];

  if (categoria) {
    sql += " WHERE categoria = ?";
    params.push(categoria);
  }

  sql += " LIMIT ? OFFSET ?";
  params.push(limite, offset);

  const [rows] = await pool.execute<ProdutoRow[]>(sql, params);
  return rows;
}

export async function buscarPorId(id: number): Promise<Produto | undefined> {
  const [rows] = await pool.execute<ProdutoRow[]>(
    "SELECT * FROM produtos WHERE id = ?",
    [id]
  );
  return rows[0];
}

export async function salvar(dados: ProdutoDTO): Promise<Produto> {
  const { nome, preco, quantidade, categoria } = dados;

  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES (?, ?, ?, ?)",
    [nome, preco, quantidade, categoria ?? null]
  );

  return { id: result.insertId, ...dados };
}

export async function atualizar(
  id: number,
  dados: ProdutoDTO
): Promise<boolean> {
  const { nome, preco, quantidade, categoria } = dados;

  const [result] = await pool.execute<ResultSetHeader>(
    "UPDATE produtos SET nome = ?, preco = ?, quantidade = ?, categoria = ? WHERE id = ?",
    [nome, preco, quantidade, categoria ?? null, id]
  );

  return result.affectedRows > 0;
}

export async function remover(id: number): Promise<boolean> {
  const [result] = await pool.execute<ResultSetHeader>(
    "DELETE FROM produtos WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
}