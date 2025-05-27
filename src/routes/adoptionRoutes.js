const express = require('express');
const router = express.Router();

const AdoptionController = require('../controllers/adoptionController');
const auth = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

// Rota protegida – Realiza uma adoção (usuário autenticado)
router.post('/adoptions', auth, AdoptionController.adopt);

// Rota protegida – Lista todas as adoções realizadas (somente admin)
router.get('/adoptions', auth, authorize(['admin']), AdoptionController.listAll);

module.exports = router;
