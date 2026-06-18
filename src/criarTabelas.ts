import "dotenv/config";
import mysql from "mysql2/promise";

async function criarTabelas(): Promise<void> {

  //Conexão inicial sem especificar o banco
  const conexaoInicial = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  });

  try {
    
    await conexaoInicial.query(
      "CREATE DATABASE IF NOT EXISTS estoque_loja CHARACTER SET utf8mb4 COLLATE utfmb4_unicode_ci;"
    );
    console.log("✅ Banco de dados 'estoque_loja' garantido!");

    await conexaoInicial.end();

    const {default: pool} = await import("./config/db.js");

    const usuarios = `
      CREATE TABLE IF NOT EXISTS usuarios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          senha VARCHAR(255) NOT NULL,
          criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const produtos = `
      CREATE TABLE IF NOT EXISTS produtos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(100) NOT NULL,
          preco DECIMAL(10,2) NOT NULL,
          quantidade INT NOT NULL DEFAULT 0,
          categoria VARCHAR(50),
          criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await pool.query(usuarios);
    console.log("✅ Tabela usuarios criada!");

    await pool.query(produtos);
    console.log("✅ Tabela produtos criada!")

    await pool.end();

  }catch (erro) {
    console.error("❌ Erro ao criar tabelas:", erro);
    try { await conexaoInicial.end(); } catch {}
  }
}

criarTabelas();