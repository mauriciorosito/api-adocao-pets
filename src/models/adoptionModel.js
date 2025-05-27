const db = require('../config/database');

class AdoptionModel {
    // Cria um registro de adoção entre um usuário e um pet
    static async create({ user_id, pet_id }) {
        await db.query(
            'INSERT INTO adoptions (user_id, pet_id) VALUES (?, ?)',
            [user_id, pet_id]
        );
    }

    // Verifica se o usuário já adotou aquele pet (evita duplicação)
    static async findByUserAndPet(user_id, pet_id) {
        const [rows] = await db.query(
            'SELECT * FROM adoptions WHERE user_id = ? AND pet_id = ?',
            [user_id, pet_id]
        );
        return rows[0];
    }

    // Lista todas as adoções realizadas com nome de usuário e nome do pet
    static async findAll() {
        const [rows] = await db.query(`
      SELECT a.id, a.adoption_date, u.name as user_name, p.name as pet_name
      FROM adoptions a
      JOIN users u ON a.user_id = u.id
      JOIN pets p ON a.pet_id = p.id
    `);
        return rows;
    }
}

module.exports = AdoptionModel;
