import request from "supertest";
import app from "../../src/app.js";
import bcrypt from "bcryptjs";

jest.mock("../../src/config/db.js", () => ({
  __esModule: true,
  default: { execute: jest.fn() },
}));

import pool from "../../src/config/db.js";

function mockExecute() {
  return (pool as unknown as { execute: jest.Mock }).execute;
}

describe("Endpoints de Usuários", () => {
  beforeAll(() => {
    process.env["JWT_SECRET"] = "secret";
  });

  afterEach(() => jest.clearAllMocks());


  it("POST /auth/registrar — deve criar usuário e retornar 201", async () => {
    mockExecute().mockResolvedValueOnce([[]]);
    mockExecute().mockResolvedValueOnce([{ insertId: 1 }]);

    const res = await request(app).post("/auth/registrar").send({
      nome: "Giliarde",
      email: "giliarde@email.com",
      senha: "senha123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe("Giliarde");
    expect(res.body.senha).toBeUndefined();
  });

  it("POST /auth/registrar — deve retornar 409 para email duplicado", async () => {
    const usuarioExistente = [{ id: 1, email: "giliarde@email.com" }];
    mockExecute().mockResolvedValueOnce([usuarioExistente]);

    const res = await request(app).post("/auth/registrar").send({
      nome: "Outro",
      email: "giliarde@email.com",
      senha: "abc",
    });

    expect(res.statusCode).toBe(409);
  });

  it("POST /auth/registrar — deve retornar 400 para body incompleto", async () => {
    const res = await request(app)
      .post("/auth/registrar")
      .send({ email: "sem-nome@email.com" });

    expect(res.statusCode).toBe(400);
  });


  it("POST /auth/login — deve autenticar e retornar JWT (200)", async () => {
    const senhaHash = await bcrypt.hash("senha123", 10);
    const mockUsuario = [
      {
        id: 1,
        nome: "Giliarde",
        email: "giliarde@email.com",
        senha: senhaHash,
      },
    ];

    mockExecute().mockResolvedValue([mockUsuario]);

    const res = await request(app).post("/auth/login").send({
      email: "giliarde@email.com",
      senha: "senha123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.token.split(".")).toHaveLength(3);
  });

  it("POST /auth/login — deve retornar 401 para senha incorreta", async () => {
    const senhaHash = await bcrypt.hash("correta", 10);
    const mockUsuario = [
      { id: 1, nome: "A", email: "a@a.com", senha: senhaHash },
    ];

    mockExecute().mockResolvedValue([mockUsuario]);

    const res = await request(app).post("/auth/login").send({
      email: "a@a.com",
      senha: "errada",
    });

    expect(res.statusCode).toBe(401);
  });

  it("POST /auth/login — deve retornar 401 para email não cadastrado", async () => {
    mockExecute().mockResolvedValue([[]]);

    const res = await request(app).post("/auth/login").send({
      email: "naoexiste@email.com",
      senha: "qualquer",
    });

    expect(res.statusCode).toBe(401);
  });
});