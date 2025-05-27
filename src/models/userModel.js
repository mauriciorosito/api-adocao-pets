const db = require('../config/database');

class UserModel {
    // Busca um usuário pelo email (usado no login)
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    // Cria um novo usuário no banco (com role padrão 'adopter')
    static async createUser({ name, email, password, phone, role = 'adopter' }) {
        await db.query(
            'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
            [name, email, password, phone, role]
        );
    }

    // Busca um usuário pelo ID
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    // Atualiza nome e telefone do usuário
    static async updateUser(id, { name, phone }) {
        await db.query('UPDATE users SET name = ?, phone = ? WHERE id = ?', [name, phone, id]);
    }

    // Remove um usuário do banco
    static async deleteUser(id) {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
    }
}

module.exports = UserModel;
