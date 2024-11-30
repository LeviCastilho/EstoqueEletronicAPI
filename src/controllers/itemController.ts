import { Request, Response } from 'express';
import { v7 } from 'uuid';
import {
  pegarTodosItens,
  pegarItemPorId,
  pegarItensPorCategoria,
  criandoItem,
  pegarItemPorNome,
  atualizarItem,
  deleteItemPorId,
} from '../models/itemModel';

// Controlador para pegar todos os itens
export const getItems = async (req: Request, res: Response) => {
  try {
    const itens = await pegarTodosItens();
    if (itens) {
      res.status(200).json(itens);
    } else{
      res.status(404).json({message: 'Nenhum item foi encontrado'});
    }
    
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};


// Controlador para pegar um item por ID
export const getItemPorId = async (req: Request, res: Response) => {
  
  try {
    const { id } = req.params;
    const item = await pegarItemPorId(id);

    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item não encontrado' });
    }
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};

// Controlador para pegar itens por categoria
export const getItensPorCategoriaPaginado = async (req: Request, res: Response) => {
  
  try {
    const { id } = req.params;
    const { order } = req.query;
    const { limit } = req.query;

    const ordemValida = order as string;   //verificando o tipo de dado esperado 
    const limitValido = parseInt(limit as string);  //passando para number por causa do parametro da função

    const itens = await pegarItensPorCategoria(id, ordemValida, limitValido);
    if (itens.length > 0) {
      res.status(200).json(itens);
    } else {
      res.status(404).json({ message: 'A categoria não foi encontrada' });
    }
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};

// Controlador para criar um novo item
export const criandoItemController = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const novoItem = req.body;

    if (!novoItem || !novoItem.nomeitem) {
      res.status(400).json({ message: "Está faltando dados" });
      return;
    }

    const itemExistente = await pegarItemPorNome(novoItem.nomeitem); //função extra no models para verificar se existe nome igual

    if (itemExistente) {
      res.status(409).json({ message: "Item já cadastrado no banco" });
      return;
    }

    novoItem.iditem = v7();  // Gerando id aqui

    const itemCriado = await criandoItem(novoItem);
    res.status(201).json(itemCriado);

  } catch (error: any) {
    const message = error.sqlMessage || error.message;
    res.status(500).json({ message });
  }
};


// Controlador para atualizar um item
export const atualizarItemController = async (req: Request, res: Response) => {
  
  try {
    const { id } = req.params;
    const itemAtualizado = req.body;
    const item = await atualizarItem(id, itemAtualizado);

    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item não encontrado' });
    }
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};

// Controlador para deletar um item por ID
export const deleteItemPorIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Verificar se o item existe antes de deletar
    const item = await pegarItemPorId(id);

    if (!item) {
      res.status(404).json({ message: 'O item não foi encontrado' });
      return;
    }

    // Excluir o item
    await deleteItemPorId(id);
    res.status(200).json({ message: 'Item deletado com sucesso!' });

  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};