export interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  categoria?: string;
  criado_em?: Date;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string; 
  criado_em?: Date;
}

export interface ProdutoDTO {
  nome: string;
  preco: number;
  quantidade: number;
  categoria?: string;
}

export interface CadastroDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface JwtPayload {
  id: number;
  nome: string;
}


declare global {
  namespace Express {
    interface Request {
      usuario?: JwtPayload;
    }
  }
}