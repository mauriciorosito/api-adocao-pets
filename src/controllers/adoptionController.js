const AdoptionService = require('../services/adoptionService');

class AdoptionController {
    // Rota POST /adoptions – Realiza a adoção de um pet
    static async adopt(req, res) {
        try {
            const userId = req.user.id;
            const { pet_id } = req.body;

            await AdoptionService.adopt(userId, pet_id);
            res.status(201).json({ message: 'Adoção realizada com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Rota GET /adoptions – Lista todas as adoções (admin)
    static async listAll(req, res) {
        try {
            const adoptions = await AdoptionService.listAll();
            res.json(adoptions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = AdoptionController;
