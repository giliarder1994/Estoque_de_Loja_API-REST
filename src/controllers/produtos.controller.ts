import type { Request, RequestHandler } from "express";
import * as produtoService from "../services/produtoService.js";
import type { ProdutoDTO } from "../types/index.js";


interface ListarQuery {
  categoria?: string;
  pagina?: string; 
  limite?: string;
}

interface IdParams {
  id: string; 
}


export const listarProdutos: RequestHandler<
  Record<string, never>,
  unknown,
  unknown,
  ListarQuery
> = async (req, res, next) => {
  try {
    const { categoria, pagina = "1", limite = "10" } = req.query;
    const offset = (Number(pagina) - 1) * Number(limite);

    const produtos = await produtoService.buscarTodos(
      categoria,
      Number(limite),
      offset
    );

    res.json(produtos);
  } catch (error) {
    next(error);
  }
};


export const buscarUm: RequestHandler<IdParams> = async (req, res, next) => {
  try {
    const produto = await produtoService.buscarPorId(Number(req.params.id));

    if (!produto) {
      res.status(404).json({ erro: "Produto não encontrado" });
      return;
    }

    res.json(produto);
  } catch (error) {
    next(error);
  }
};


export const criar: RequestHandler<
  Record<string, never>,
  unknown,
  ProdutoDTO
> = async (req, res, next) => {
  try {
    const { nome, preco, quantidade } = req.body;

    if (!nome || preco == null || quantidade == null) {
      res.status(400).json({ erro: "Campos obrigatórios: nome, preco, quantidade" });
      return;
    }

    const novo = await produtoService.salvar(req.body);
    res.status(201).json(novo);
  } catch (error) {
    next(error);
  }
};


export const editar: RequestHandler<IdParams, unknown, ProdutoDTO> = async (
  req,
  res,
  next
) => {
  try {
    const sucesso = await produtoService.atualizar(
      Number(req.params.id),
      req.body
    );

    if (!sucesso) {
      res.status(404).json({ erro: "Produto não encontrado" });
      return;
    }

    res.json({ id: Number(req.params.id), ...req.body });
  } catch (error) {
    next(error);
  }
};


export const deletar: RequestHandler<IdParams> = async (req, res, next) => {
  try {
    const sucesso = await produtoService.remover(Number(req.params.id));

    if (!sucesso) {
      res.status(404).json({ erro: "Produto não encontrado" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};