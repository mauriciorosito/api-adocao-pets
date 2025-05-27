const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');

const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Middlewares globais
app.use(cors()); // Permite requisições de diferentes origens
app.use(helmet()); // Adiciona cabeçalhos de segurança HTTP
app.use(express.json()); // Faz o parse de requisições com JSON

// Rotas da API
app.use(userRoutes);
app.use(petRoutes);
app.use(adoptionRoutes);

// Middleware de tratamento global de erros  (deve ser adicionado depois das rotas)
app.use(errorMiddleware);

module.exports = app;
