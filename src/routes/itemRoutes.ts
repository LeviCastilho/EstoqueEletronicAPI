import { Router } from 'express';
import * as itemController from '../controllers/itemController';


const router = Router();


router.get('/', itemController.getItems); // Pegar todos os itens
router.get('/:id', itemController.getItemPorId); // Pegar item por ID
router.get('/categoria/:id', itemController.getItemPorCategoria); 
router.post('/', itemController.criandoItemController); // Criar novo item
router.put('/:id', itemController.atualizarItemController); // Atualizar item por ID
router.delete('/:id', itemController.deleteItemPorIdController); // Deletar item por ID

export default router;