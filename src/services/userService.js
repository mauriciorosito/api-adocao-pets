const UserModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hashPassword');

class UserService {
  // Cria um novo usuário com senha criptografada
  static async register(user) {
    const hashed = await hashPassword(user.password);
    await UserModel.createUser({ ...user, password: hashed });
  }

  // Valida login comparando a senha informada com o hash armazenado
  static async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) return null;

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return null;

    return user;
  }

  // Busca um usuário pelo ID
  static async getById(id) {
    return await UserModel.findById(id);
  }

  // Atualiza nome e telefone de um usuário
  static async update(id, data) {
    await UserModel.updateUser(id, data);
  }

  // Remove um usuário do banco de dados
  static async delete(id) {
    await UserModel.deleteUser(id);
  }
}

module.exports = UserService;
