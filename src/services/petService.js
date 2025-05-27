const PetModel = require('../models/petModel');

class PetService {
    // Lista todos os pets com status "available"
    static async listAvailable() {
        return await PetModel.findAllAvailable();
    }

    // Lista todos os pets (usado por administradores)
    static async listAll() {
        return await PetModel.findAll();
    }

    // Busca um pet pelo ID
    static async getById(id) {
        return await PetModel.findById(id);
    }

    // Cadastra um novo pet
    static async create(data) {
        await PetModel.create(data);
    }

    // Atualiza dados de um pet
    static async update(id, data) {
        await PetModel.update(id, data);
    }

    // Remove um pet (só se status for "available")
    static async delete(id) {
        const pet = await PetModel.findById(id);
        if (!pet || pet.status === 'adopted') {
            throw new Error('Pet não pode ser removido');
        }
        await PetModel.delete(id);
    }

    // Marca o pet como adotado
    static async markAsAdopted(id) {
        await PetModel.updateStatus(id, 'adopted');
    }
}

module.exports = PetService;
