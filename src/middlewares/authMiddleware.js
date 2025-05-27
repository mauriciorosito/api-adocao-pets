const express = require('express');
const router = express.Router();

const PetController = require('../controllers/petController');
const auth = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

// Apenas administradores podem cadastrar novos pets
router.post('/pets', auth, authorize(['admin']), PetController.create);

// Usuários comuns podem apenas listar
router.get('/pets/available', PetController.listAvailable);
