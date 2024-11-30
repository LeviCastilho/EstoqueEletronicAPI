import { Request, Response } from 'express';
import { v7 } from 'uuid';
import {
  pegarTodasCat,
  pegarCatPorId,
  criandoCat,
  pegarCategoriaPorNome,
  atualizarCat,
  deleteCatPorId,
} from '../models/categoryModel';

// Controlador para pegar todas as categorias
export const getCategorias = async (req: Request, res: Response) => {
  try {
    const itens = await pegarTodasCat();
    if (itens) {
      res.status(200).json(itens);
    } else{
      res.status(404)
      throw new Error ('Nenhuma categoria foi encontrada');
    }
    
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};

// Controlador para pegar uma categoria por ID
export const getCatPorId = async (req: Request, res: Response) => {
  
  try {
    const { id } = req.params;
    const categoria = await pegarCatPorId(id);

    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};

// Controlador para criar uma nova categoria
export const criandoCatController = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const novaCategoria = req.body;

    if (!novaCategoria || !novaCategoria.nomecategoria) {
      res.status(400).json({ message: "Está faltando dados" });
      return;
    }

    // Verificar se já existe uma categoria com o mesmo nome
    const categoriaExistente = await pegarCategoriaPorNome(novaCategoria.nomecategoria);

    if (categoriaExistente) {
      res.status(409).json({ message: "Categoria já cadastrada no banco" });
      return;
    }

    // Gerar um ID único para a categoria
    novaCategoria.idcategoria = v7();  // Gerando id aqui com v7

    // Inserir a nova categoria no banco
    const categoriaCriada = await criandoCat(novaCategoria);

    // Retornar a categoria criada no banco
    res.status(201).json(categoriaCriada);

  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};

// Controlador para atualizar uma categoria
export const atualizarCatController = async (req: Request, res: Response) => {
  
  try {
    const { id } = req.params;
    const categoriaAtualizada = req.body;
    const categoria = await atualizarCat(id, categoriaAtualizada);

    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: 'A categoria não foi encontrada' });
    }
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};

// Controlador para deletar uma categoria por ID
export const deleteCatPorIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Verificar se a categoria existe antes de deletar
    const categoria = await pegarCatPorId(id);

    if (!categoria) {
      res.status(404).json({ message: 'A categoria não foi encontrada' });
      return;
    }

    // Excluir a categoria
    await deleteCatPorId(id);
    res.status(200).send({message: 'A categoria foi deletada' });
    
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};