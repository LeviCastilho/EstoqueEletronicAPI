import { Request, Response } from 'express';
import { v7 } from 'uuid';
import {
  pegarTodosForn,
  pegarFornPorId,
  criandoForn,
  pegarFornecedorPorNome,
  atualizarForn,
  deleteFornPorId,
} from '../models/supplierModel';

// Controlador para pegar todos os fornecedores
export const getFornecedores = async (req: Request, res: Response) => {
  try {
    const fornecedores = await pegarTodosForn();
    if(fornecedores){
      res.status(200).json(fornecedores);
    } else{
      res.status(404)
      throw new Error ('Nenhum fornecedor foi encontrado');
    }
    
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};

// Controlador para pegar um fornecedor por ID
export const getFornPorId = async (req: Request, res: Response) => {
  
  try {
    const { id } = req.params;
    const fornecedor = await pegarFornPorId(id);

    if (fornecedor) {
      res.status(200).json(fornecedor);
    } else {
      res.status(404).json({ message: 'Fornecedor não encontrado' });
    }
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};

// Controlador para criar um novo fornecedor
export const criandoFornController = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const novoFornecedor = req.body;
    // Verificar se os dados essenciais estão presentes
    if (!novoFornecedor || !novoFornecedor.nomefornecedor) {
      res.status(400).json({ message: "Está faltando dados" });
      return;
    }

    // Verificar se já existe um fornecedor com o mesmo nome
    const fornecedorExistente = await pegarFornecedorPorNome(novoFornecedor.nomefornecedor);

    if (fornecedorExistente) {
      res.status(409).json({ message: "Fornecedor já cadastrado no banco" });
      return;
    }

    // Gerar um ID único para o fornecedor
    novoFornecedor.idfornecedor = v7();  // Gerando id aqui com v7

    // Inserir o novo fornecedor no banco
    const fornecedorCriado = await criandoForn(novoFornecedor);

    // Retornar o fornecedor criado
    res.status(201).json(fornecedorCriado);
  } catch (error: any) {
    const message = error.sqlMessage || error.message;
    res.status(500).json({ message });
  }
};

// Controlador para atualizar um fornecedor
export const atualizarFornController = async (req: Request, res: Response) => {
  
  try {
    const { id } = req.params;
    const fornecedorAtualizado = req.body;
    const fornecedor = await atualizarForn(id, fornecedorAtualizado);

    if (fornecedor) {
      res.status(200).json(fornecedor);
    } else {
      res.status(404).json({ message: 'O fornecedor não foi encontrado' });
    }
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};

// Controlador para deletar um fornecedor por ID
export const deleteFornPorIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Verificar se o fornecedor existe antes de deletar
    const fornecedor = await pegarFornPorId(id);

    if (!fornecedor) {
      res.status(404).json({ message: 'O fornecedor não foi encontrado' });
      return;
    }

    await deleteFornPorId(id);
    res.status(200).send({ message: 'O fornecedor foi deletado' });
    
  } catch (error: any) {
    const message = error.sqlMessage || error.message
    res.send(message);
  }
};