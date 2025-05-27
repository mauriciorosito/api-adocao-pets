const db = require('../config/database');

class PetModel {
    // Retorna todos os pets com status "available"
    static async findAllAvailable() {
        const [rows] = await db.query('SELECT * FROM pets WHERE status = "available"');
        return rows;
    }

    // Retorna todos os pets cadastrados (usado por admins)
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM pets');
        return rows;
    }

    // Busca um pet específico pelo ID
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
        return rows[0];
    }

    // Cadastra um novo pet no banco com status inicial "available"
    static async create(pet) {
        const { name, age, species, size, description } = pet;
        await db.query(
            'INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, ?, ?)',
            [name, age, species, size, 'available', description]
        );
    }

    // Atualiza dados do pet (inclusive o status se necessário)
    static async update(id, pet) {
        const { name, age, species, size, status, description } = pet;
        await db.query(
            'UPDATE pets SET name = ?, age = ?, species = ?, size = ?, status = ?, description = ? WHERE id = ?',
            [name, age, species, size, status, description, id]
        );
    }

    // Remove um pet do banco
    static async delete(id) {
        await db.query('DELETE FROM pets WHERE id = ?', [id]);
    }

    // Atualiza apenas o status do pet (ex: de "available" para "adopted")
    static async updateStatus(id, status) {
        await db.query('UPDATE pets SET status = ? WHERE id = ?', [status, id]);
    }
}

module.exports = PetModel;
