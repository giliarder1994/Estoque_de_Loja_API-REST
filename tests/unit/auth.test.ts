import { autenticar } from "../../src/middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";


function makeRes() {
  const res = {
    statusCode: 200,
    body: null as unknown,
    status(code: number) {
      this.statusCode = code;
      return this; 
    },
    json(data: unknown) {
      this.body = data;
      return this;
    },
  };
  return res as unknown as Response;
}

function makeNext(): jest.Mock {
  return jest.fn();
}


describe("Auth Middleware — autenticar()", () => {
  const SECRET = "test-secret";

  beforeEach(() => {
    process.env["JWT_SECRET"] = SECRET;
  });

  it("deve retornar 401 se o header Authorization estiver ausente", () => {
    const req = { headers: {} } as Request;
    const res = makeRes();
    const next = makeNext();

    autenticar(req, res, next as unknown as NextFunction);

    expect(res.statusCode).toBe(401);
    expect((res as unknown as { body: unknown }).body).toEqual({ erro: "Token não fornecido" });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 401 para token inválido", () => {
     const req = {
      headers: { authorization: "Bearer token.invalido.aqui" },
    } as Request;
    const res = makeRes();
    const next = makeNext();

    autenticar(req, res, next as unknown as NextFunction);

    expect(res.statusCode).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("deve chamar next() e injetar req.usuario para token válido", () => {
    const payload = { id: 1, nome: "Admin" };
    const token = jwt.sign(payload, SECRET);

    const req = {
      headers: { authorization: `Bearer ${token}` },
    } as Request;
    const res = makeRes();
    const next = makeNext();

    autenticar(req, res, next as unknown as NextFunction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.usuario).toMatchObject(payload);
  });
});