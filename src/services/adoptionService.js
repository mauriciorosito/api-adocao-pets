const AdoptionModel = require('../models/adoptionModel');
const PetModel = require('../models/petModel');

class AdoptionService {
    // Realiza a adoção de um pet
    static async adopt(user_id, pet_id) {
        const pet = await PetModel.findById(pet_id);

        // Verifica se o pet existe e está disponível
        if (!pet || pet.status !== 'available') {
            throw new Error('Pet não disponível para adoção');
        }

        // Verifica se o usuário já adotou este pet
        const alreadyAdopted = await AdoptionModel.findByUserAndPet(user_id, pet_id);
        if (alreadyAdopted) {
            throw new Error('Este pet já foi adotado por você');
        }

        // Cria o registro de adoção e atualiza o status do pet
        await AdoptionModel.create({ user_id, pet_id });
        await PetModel.updateStatus(pet_id, 'adopted');
    }

    // Lista todas as adoções realizadas (somente admin)
    static async listAll() {
        return await AdoptionModel.findAll();
    }
}

module.exports = AdoptionService;
