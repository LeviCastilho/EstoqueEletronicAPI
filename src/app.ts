import express from 'express';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes';
import categoriaRoutes from './routes/categoryRoutes';
import fornecedorRoutes from './routes/supplierRoutes';
import { db } from './models/db'; 


dotenv.config();                       

const app = express();


app.use(express.json());

// Rotas
app.use('/item', itemRoutes); // Rotas para os itens
app.use('/categoria', categoriaRoutes); // Rotas para as categorias
app.use('/fornecedor', fornecedorRoutes); // Rotas para os fornecedores


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});