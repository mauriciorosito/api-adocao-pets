const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

// Rota pública – Criação de novo usuário (cadastro)
router.post('/users', UserController.register);

// Rota pública – Login (retorna JWT)
router.post('/login', UserController.login);

// Rota protegida – Visualizar dados do próprio usuário ou de outro (apenas admin)
router.get('/users/:id', auth, authorize(['admin']), UserController.getById);

// Rota protegida – Atualizar nome e telefone (admin ou o próprio usuário)
router.put('/users/:id', auth, UserController.update); // controle de permissão pode ser feito dentro do controller, se desejar

// Rota protegida – Deletar usuário (somente admin)
router.delete('/users/:id', auth, authorize(['admin']), UserController.delete);

module.exports = router;
