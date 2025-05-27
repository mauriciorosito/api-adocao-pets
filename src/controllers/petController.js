const PetService = require('../services/petService');

class PetController {
    // Rota GET /pets/available – Lista pets disponíveis (público)
    static async listAvailable(req, res) {
        try {
            const pets = await PetService.listAvailable();
            res.json(pets);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Rota GET /pets – Lista todos os pets (admin)
    static async listAll(req, res) {
        try {
            const pets = await PetService.listAll();
            res.json(pets);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Rota GET /pets/:id – Busca pet por ID (admin)
    static async getById(req, res) {
        try {
            const pet = await PetService.getById(req.params.id);
            if (!pet) return res.status(404).json({ error: 'Pet não encontrado' });
            res.json(pet);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Rota POST /pets – Cadastra novo pet (admin)
    static async create(req, res) {
        try {
            await PetService.create(req.body);
            res.status(201).json({ message: 'Pet cadastrado com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Rota PUT /pets/:id – Atualiza pet (admin)
    static async update(req, res) {
        try {
            await PetService.update(req.params.id, req.body);
            res.json({ message: 'Pet atualizado com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Rota DELETE /pets/:id – Remove pet (apenas se disponível)
    static async delete(req, res) {
        try {
            await PetService.delete(req.params.id);
            res.json({ message: 'Pet removido com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = PetController;
