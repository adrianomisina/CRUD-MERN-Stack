import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Importe o módulo cors
import todoRoutes from './routes/todo.routes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDb Conectado :)');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS
app.use(cors());
app.use(express.json());
app.use('/api', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
