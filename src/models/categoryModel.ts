import { db } from './db'; 


export interface Categoria {
  idcategoria: string;
  nomecategoria: string;
}

// Função para pegar todas as categorias
export const pegarTodasCat = async () => {
  return db<Categoria>('categoria'); 
};

// Função para pegar uma categoria por ID
export const pegarCatPorId = async (id: string) => {
  return db<Categoria>('categoria').where({ idcategoria: id }).first();
};

// Função para criar uma nova categoria
export const criandoCat = async (categoria: Categoria) => {
  return db<Categoria>('categoria').insert(categoria).returning('*');
};

// Função pra verificar se já existe um nome da categoria igual
export const pegarCategoriaPorNome = async (nomecategoria: string) => {
  return db<Categoria>('categoria').where({ nomecategoria }).first();
};

// Função para atualizar uma categoria
export const atualizarCat = async (id: string, categoria: Partial<Categoria>) => {
  return db<Categoria>('categoria').where({ idcategoria: id }).update(categoria).returning('*');
};

// Função para deletar uma categoria por ID
export const deleteCatPorId = async (id: string) => {
  return db<Categoria>('categoria').where({ idcategoria: id }).del();
};
