import request from "supertest";
import app from "../../src/app.js";
import jwt from "jsonwebtoken";

jest.mock("../../src/config/db.js", () => ({
  __esModule: true,
  default: { execute: jest.fn() },
}));

import pool from "../../src/config/db.js";

function mockExecute() {
  return (pool as unknown as { execute: jest.Mock }).execute;
}


function gerarToken() {
  return jwt.sign(
    { id: 1, nome: "Admin" },
    process.env["JWT_SECRET"] ?? "secret"
  );
}


describe("Endpoints de Produtos", () => {
  let token: string;

  beforeAll(() => {
    process.env["JWT_SECRET"] = "secret";
    token = gerarToken();
  });

  afterEach(() => jest.clearAllMocks());


  it("GET /produtos — deve retornar lista de produtos (200)", async () => {
    const mockProdutos = [{ id: 1, nome: "Teclado", preco: 100, quantidade: 5 }];

    mockExecute().mockResolvedValueOnce([mockProdutos]);

    const res = await request(app)
      .get("/produtos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockProdutos);
  });

  it("GET /produtos — deve retornar 401 sem token", async () => {
    const res = await request(app).get("/produtos");
    expect(res.statusCode).toBe(401);
  });


  it("GET /produtos/:id — deve retornar produto por id (200)", async () => {
    const mock = { id: 1, nome: "Teclado", preco: 100, quantidade: 5 };
    mockExecute().mockResolvedValueOnce([[mock]]);

    const res = await request(app)
      .get("/produtos/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe("Teclado");
  });

  it("GET /produtos/:id — deve retornar 404 para id inexistente", async () => {
    mockExecute().mockResolvedValueOnce([[]]);

    const res = await request(app)
      .get("/produtos/999")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });


  it("POST /produtos — deve criar produto e retornar 201", async () => {
    mockExecute().mockResolvedValueOnce([{ insertId: 42 }]);

    const novoProduto = {
      nome: "Mouse Gamer",
      preco: 150.0,
      quantidade: 10,
      categoria: "Periféricos",
    };

    const res = await request(app)
      .post("/produtos")
      .set("Authorization", `Bearer ${token}`)
      .send(novoProduto);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBe(42);
    expect(res.body.nome).toBe("Mouse Gamer");
  });

  it("POST /produtos — deve retornar 400 para body incompleto", async () => {
    const res = await request(app)
      .post("/produtos")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Produto sem preço" }); // faltam preco e quantidade

    expect(res.statusCode).toBe(400);
  });


  it("PUT /produtos/:id — deve atualizar e retornar 200", async () => {
    mockExecute().mockResolvedValueOnce([{ affectedRows: 1 }]);

    const res = await request(app)
      .put("/produtos/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Teclado Mecânico", preco: 300, quantidade: 3 });

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it("PUT /produtos/:id — deve retornar 404 para id inexistente", async () => {
    mockExecute().mockResolvedValueOnce([{ affectedRows: 0 }]);

    const res = await request(app)
      .put("/produtos/999")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "X", preco: 10, quantidade: 1 });

    expect(res.statusCode).toBe(404);
  });


  it("DELETE /produtos/:id — deve remover e retornar 204", async () => {
    mockExecute().mockResolvedValueOnce([{ affectedRows: 1 }]);

    const res = await request(app)
      .delete("/produtos/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});