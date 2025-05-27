const express = require('express');
const router = express.Router();

const PetController = require('../controllers/petController');
const auth = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

// Rota pública – Lista todos os pets disponíveis para adoção
router.get('/pets/available', PetController.listAvailable);

// Rota protegida – Lista todos os pets (inclusive adotados) – apenas admin
router.get('/pets', auth, authorize(['admin']), PetController.listAll);

// Rota protegida – Buscar pet por ID – apenas admin
router.get('/pets/:id', auth, authorize(['admin']), PetController.getById);

// Rota protegida – Cadastrar novo pet – apenas admin
router.post('/pets', auth, authorize(['admin']), PetController.create);

// Rota protegida – Atualizar dados de um pet – apenas admin
router.put('/pets/:id', auth, authorize(['admin']), PetController.update);

// Rota protegida – Remover pet – apenas admin
router.delete('/pets/:id', auth, authorize(['admin']), PetController.delete);

module.exports = router;
