import { db } from './db'; 


export interface Fornecedor {
  idfornecedor: string;
  nomefornecedor: string;
  email: string;
  telefone: string;
}

// Função para pegar todos os fornecedores
export const pegarTodosForn = async () => {
  return db<Fornecedor>('fornecedor'); 
};

// Função para pegar um fornecedor por ID
export const pegarFornPorId = async (id: string) => {
  return db<Fornecedor>('fornecedor').where({ idfornecedor: id }).first();
};

// Função para criar um novo fornecedor
export const criandoForn = async (fornecedor: Fornecedor) => {
  return db<Fornecedor>('fornecedor').insert(fornecedor).returning('*');
};

// Função pra verificar se existe um fornecedor com nome igual
export const pegarFornecedorPorNome = async (nomefornecedor: string) => {
  return db<Fornecedor>('fornecedor').where({ nomefornecedor }).first();
};

// Função para atualizar um fornecedor
export const atualizarForn = async (id: string, fornecedor: Partial<Fornecedor>) => {
  return db<Fornecedor>('fornecedor').where({ idfornecedor: id }).update(fornecedor).returning('*');
};

// Função para deletar um fornecedor por ID
export const deleteFornPorId = async (id: string) => {
  return db<Fornecedor>('fornecedor').where({ idfornecedor: id }).del();
};
