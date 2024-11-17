import { db } from './db'; 


export interface Item {
  iditem: string;
  nomeitem: string;
  qntitem: number;
  precoitem: number;
  idcategoria: string;
  idfornecedor: string;
  dataentrada: Date; 
}

// Função para pegar todos os itens
export const pegarTodosItens = async () => {
  return db('item'); 
};

// Função para pegar um item por ID
export const pegarItemPorId = async (id: string) => {
  return db<Item>('item').where({ iditem: id }).first();
};

// Função para pegar itens por categoria
export const pegarItensPorCategoria = async (idcategoria: string) => {
    return db<Item>('item').where({ idcategoria }); // Filtra por idCategoria
};

// Função para criar um novo item
export const criandoItem = async (item: Item) => {
  return db<Item>('item').insert(item).returning('*');
};

// Função para verificar se já existe o nome do item novo 
export const pegarItemPorNome = async (nomeitem: string) => {
  return db<Item>('item').where({ nomeitem }).first();
};

// Função para atualizar um item
export const atualizarItem = async (id: string, item: Partial<Item>) => {
  return db<Item>('item').where({ iditem: id }).update(item).returning('*');
};

// Função para deletar um item por ID
export const deleteItemPorId = async (id: string) => {
  return db<Item>('item').where({ iditem: id }).del();
};