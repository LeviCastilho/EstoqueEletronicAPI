import { Router } from 'express';
import * as categoriaController from '../controllers/categoryController';

const router = Router();


router.get('/', categoriaController.getCategorias); // Pegar todas as categorias
router.get('/:id', categoriaController.getCatPorId); // Pegar categoria por ID
router.post('/', categoriaController.criandoCatController); // Criar nova categoria
router.put('/:id', categoriaController.atualizarCatController); // Atualizar categoria por ID
router.delete('/:id', categoriaController.deleteCatPorIdController); // Deletar categoria por ID

export default router;