const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

class UserController {
    // Rota POST /users – Registra um novo usuário
    static async register(req, res) {
        try {
            await UserService.register(req.body);
            res.status(201).json({ message: 'Usuário registrado com sucesso' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Rota POST /login – Autentica o usuário e gera JWT
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.login(email, password);

            if (!user) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            // Cria o token com userId e role
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (err) {
            res.status(500).json({ error: 'Erro no login' });
        }
    }

    // Rota GET /users/:id – (admin ou próprio usuário)
    static async getById(req, res) {
        try {
            const user = await UserService.getById(req.params.id);
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Rota PUT /users/:id – Atualiza o nome/telefone (autorizado)
    static async update(req, res) {
        try {
            await UserService.update(req.params.id, req.body);
            res.json({ message: 'Usuário atualizado' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Rota DELETE /users/:id – Remove um usuário (admin)
    static async delete(req, res) {
        try {
            await UserService.delete(req.params.id);
            res.json({ message: 'Usuário excluído' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = UserController;
