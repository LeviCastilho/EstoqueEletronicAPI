import { Router } from 'express';
import * as fornecedorController from '../controllers/supplierController';

const router = Router();

// Definindo os endpoints para a tabela Fornecedor
router.get('/', fornecedorController.getFornecedores); // Pegar todos os fornecedores
router.get('/:id', fornecedorController.getFornPorId); // Pegar fornecedor por ID
router.post('/', fornecedorController.criandoFornController); // Criar novo fornecedor
router.put('/:id', fornecedorController.atualizarFornController); // Atualizar fornecedor por ID
router.delete('/:id', fornecedorController.deleteFornPorIdController); // Deletar fornecedor por ID

export default router;
